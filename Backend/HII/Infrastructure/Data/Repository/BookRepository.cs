using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public class BookRepository : IBookRepository
    {
        private readonly StoreContext _context;
        public BookRepository(StoreContext context) 
        {
            _context = context;
        }
        public async Task<List<Book>> GetAllBookAsync()
        {
            List<Book> book = await _context.Books
                .Include(b => b.Author).Include(b => b.Category).Include(b => b.Type).Include(b => b.Course).ToListAsync();
            return book;
        }

        public async Task<Book> GetByIdBookAsync(int? id)
        {
            if (id == null)
            {
                return null;

            }
            Book book = await _context.Books
              .Include(b => b.Author).Include(b => b.Category).Include(b => b.Type).Include(b => b.Course).FirstOrDefaultAsync(b => b.Id == id);
            if (book == null)
            {
                throw new KeyNotFoundException($"Book with Id {id} not found");
            }
            return book;

        }
        public async Task AddAsync(Book book, int typeId, int categoryId, int authorId, int? courseId)
        {
            Book existingBook = await _context.Books.FirstOrDefaultAsync(b => b.Title == book.Title);
            if (existingBook != null)
            {
                throw new ArgumentException("Eyni adlı kitab artıq mövcuddur.");
            }
            if (book.PhotoFile != null)
            {
                if (!FileHelper.IsValidImage(book.PhotoFile))
                    throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");
                
                book.Photo = await FileHelper.SaveFileAsync(book.PhotoFile, "wwwroot/images");
            }
            else
            {
                book.Photo = null; // If no photo is selected, explicitly set it to null
            }
            if (book.DocumentFile != null)
            {
                if (book.PhotoFile != null && !FileHelper.IsValidImage(book.PhotoFile))
                    throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");

                book.Document = await FileHelper.SaveFileAsync(book.DocumentFile, "wwwroot/documents");
            }
            if (book.AuthorId > 0)
            {
                Author bookAuthor = await _context.Author.FindAsync(authorId);
            }
            if (book.TypeId > 0)
            {
                Core.Entities.Type bookType = await _context.Type.FindAsync(typeId);
            }
            if (book.CategoryId > 0)
            {
                Category bookType = await _context.Category.FindAsync(categoryId);
            }
            if (courseId.HasValue && courseId.Value > 0)
            {
                Course bookCourse = await _context.Course.FindAsync(courseId.Value);
                if (bookCourse == null)
                {
                    throw new ArgumentException("Belirtilen course bulunamadı.");
                }
                book.CourseId = courseId;
            }
            else
            {
                book.CourseId = null;
            }
            if (book == null)
            {
                throw new ArgumentException(nameof(book), "The book object cannot be null.");
            }
            if (string.IsNullOrEmpty(book.Description))
            {
                book.Description = "Default Description"; // Set a default value if it's empty
            }

            book.TypeId = typeId;
            book.CategoryId = categoryId;
            book.TypeId = typeId;
            book.CourseId = courseId;

            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();

        }

        public async Task<string> DeleteAsync(int? id)
        {
            try
            {
                if (id == null)
                {

                    throw new ArgumentException("Invalid ID.", nameof(id));
                }
                Book book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
                if (book == null)
                {
                    throw new KeyNotFoundException("Book not found.");
                }
                _context.Books.Remove(book);
                await _context.SaveChangesAsync();
                return $"{id}: Deleted.";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<Book> UpdateAsync(int id, Book book, int typeId, int categoryId, int authorId, int? courseId)
        {
            if (book == null)
            {
                throw new ArgumentException(nameof(book), "the book object cannot be null");
            }
            Book dbBook = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
            if (dbBook == null)
            {
                throw new Exception("Book not found");
            }
            dbBook.Title = book.Title;
            dbBook.Description = book.Description;
            dbBook.CreateBook = book.CreateBook;

            if (book.PhotoFile != null)
            {
                if (!FileHelper.IsValidImage(book.PhotoFile))
                    throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");

                dbBook.Photo = await FileHelper.SaveFileAsync(book.PhotoFile, "wwwroot/images");
            }

            if (book.DocumentFile != null)
            {
                if (!FileHelper.IsValidDocument(book.DocumentFile))
                    throw new ArgumentException("Invalid document type. Only PDF and Word are allowed.");

                dbBook.Document = await FileHelper.SaveFileAsync(book.DocumentFile, "wwwroot/documents");
            }

            dbBook.TypeId = typeId;
            dbBook.CategoryId = categoryId;
            dbBook.AuthorId = authorId;
            dbBook.CourseId = courseId;
            await _context.SaveChangesAsync();
            return dbBook;
        }

        public async Task<(IEnumerable<Book>, int)> GetBooksWithFiltersAsync(BookParams bookParams)
        {
            IQueryable<Book> query = _context.Books
                .Include(b => b.Type).Include(b => b.Category).Include(b => b.Author).Include(b => b.Course).AsQueryable();
            //Search
            if (!string.IsNullOrEmpty(bookParams.Search))
            {
                string searchTerm = bookParams.Search.ToLower();
                query = query.Where(b => b.Title.ToLower().Contains(searchTerm) ||
                                    b.Description.ToLower().Contains(searchTerm) ||
                                    b.Category.Name.ToLower().Contains(searchTerm) ||
                                    b.Type.Name.ToLower().Contains(searchTerm) ||
                                    b.Author.FullName.ToLower().Contains(searchTerm) ||
                                    b.Course.Title.ToLower().Contains(searchTerm)
                                    );
            }
            //Filters
            if (bookParams.TypeId.HasValue)
            {
                query = query.Where(b => b.TypeId == bookParams.TypeId);
               
            }
            if (bookParams.CategoryId.HasValue)
            {
                query = query.Where(b => b.CategoryId == bookParams.CategoryId);
            }
            if (bookParams.AuthorId.HasValue)
            {
                query = query.Where(b => b.AuthorId == bookParams.AuthorId);
            }
            if (bookParams.CourseId.HasValue)
            {
                query = query.Where(b => b.CourseId == bookParams.CourseId);
            }
            //Pagnations
            int totalRecords = await query.CountAsync();
            List<Book> books = await query.Skip((bookParams.PageNumber - 1) * bookParams.PageSize)
                                   .Take(bookParams.PageSize).ToListAsync();

            return (books, totalRecords);

        }
        public async Task<Book> DownloadAsync(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
            if (book == null)
            {
                return null;
            }

            // Kitap dosyasının yolunu alıyoruz
            return new Book
            {
                Title = book.Title,
                Description = book.Description,
                Document = book.Document // Dosya adı
            };
        }

        //public async Task<Book> DownloadAsync(int id)
        //{
        //    Book book = await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
        //    if (book == null)
        //    {
        //        return null;
        //    }

        //    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/documents");

        //    // Dosya yolu id'ye göre oluşturuluyor
        //    string filePath = Path.Combine(folderPath, $"{id}");

        //    // Dosya indirme
        //    var fileBytes = await FileHelper.DownloadFileAsync(filePath);

        //    // MIME tipi doğrulama
        //    //if (!book.Document.EndsWith(".pdf"))
        //    //    throw new InvalidOperationException("Only PDF files are allowed.");

        //    // Kitap nesnesi oluştur
        //    return new Book
        //    {
        //        Title = Path.GetFileNameWithoutExtension(filePath),
        //        Description = Convert.ToBase64String(fileBytes)
        //    };
        //}

    }
}
