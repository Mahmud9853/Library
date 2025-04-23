using Core.Entities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IBookRepository
    {
        Task<(IEnumerable<Book>, int)> GetBooksWithFiltersAsync(BookParams bookParams); 
        Task<List<Book>> GetAllBookAsync();
        Task<Book> GetByIdBookAsync(int? id);
        Task AddAsync(Book book, int typeId, int categoryId, int authorId, int? courseId);
        Task<Book> UpdateAsync(int id, Book book, int typeId, int categoryId, int authorId, int? courseId);
        Task<string> DeleteAsync(int? id);
        Task<Book> DownloadAsync(int id);
    }
}
