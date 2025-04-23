using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategoryAsync();
        Task<Category> GetByIdCategoryAsync(int? id);
        Task<string> DeleteAsync(int? id);
        Task<string> UpdateAsync(int? id, Category category);
        Task<string> AddAsync(Category category);


    }
}
