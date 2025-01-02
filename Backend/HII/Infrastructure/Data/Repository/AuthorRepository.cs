using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly StoreContext _context;
        public AuthorRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<List<Author>> GetAllAuthor()
        {
            List<Author> authors = await _context.Author.ToListAsync();
            return authors;
        }

        public async Task<Author> GetByIdAuthor(int? id)
        {
            if (id == null)
               throw new NullReferenceException();
            
            Author author = await _context.Author.FirstOrDefaultAsync(x => x.Id == id);

            if (author == null)
                throw new KeyNotFoundException($"Book with Id {id} not found");
            return author;
        }
        public async Task<string> AddAsync(Author author)
        {
            try
            {
                await _context.Author.AddAsync(author);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
            return "Success";
           
        }

        public async Task<string> DeleteAsync(int? id)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                Author author = await _context.Author.FirstOrDefaultAsync(x => x.Id == id);

                if (author == null)
                    throw new KeyNotFoundException($"Book with Id {id} not found");

                _context.Author.Remove(author);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
            return $"{id} Deleted";
        }

       

        public async Task<string> UpdateAsync(int? id, Author author)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                Author dbAuthor = await _context.Author.FirstOrDefaultAsync(x => x.Id == id);
                if (dbAuthor == null)
                {
                    throw new Exception();
                }
                dbAuthor.FullName = author.FullName;
                await _context.SaveChangesAsync();
                return $"{id}:Updated";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
          

        }
    }
}
