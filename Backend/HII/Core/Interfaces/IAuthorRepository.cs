using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IAuthorRepository
    {
        Task<List<Author>> GetAllAuthor();
        Task<Author> GetByIdAuthor(int? id);
        Task<string> AddAsync(Author author);
        Task<string> DeleteAsync(int? id);
        Task<string> UpdateAsync(int? id, Author author);
        
    }
}
