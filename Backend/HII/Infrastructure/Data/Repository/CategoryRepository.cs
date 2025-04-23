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
    public class CategoryRepository : ICategoryRepository
    {
        private readonly StoreContext _context;
        public CategoryRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<string> AddAsync(Category category)
        {
            try
            {
                await _context.AddAsync(category);
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
            if (id == null)
            {
                return null;
            }
            Category category = await _context.Category.FirstOrDefaultAsync(x => x.Id == id);
            if (category == null)
            {
                throw new KeyNotFoundException($"Book with Id {id} not found");
            }
            _context.Category.Remove(category);
            await _context.SaveChangesAsync();
            return $"{id} Deleted";

        }

        public async Task<List<Category>> GetAllCategoryAsync()
        {
            List<Category> category = await _context.Category.ToListAsync();
            return category;
        }

        public async Task<Category> GetByIdCategoryAsync(int? id)
        {
            
                if (id == null)
                {
                    return null;
                }
                Category category = await _context.Category.FirstOrDefaultAsync(x => x.Id == id);
                if (category == null)
                {
                    throw new KeyNotFoundException($"Book with Id {id} not found");

                }
            return category;
          
        }

        public async Task<string> UpdateAsync(int? id, Category category)
        {

            try
            {

            if (id == null)
            {
                return null;
            }
            Category dbCategory =await _context.Category.FirstOrDefaultAsync(x => x.Id == id);
            if (dbCategory == null)
            {
                throw new KeyNotFoundException($"Book with Id {id} not found");

            }
            dbCategory.Name = category.Name;
            await _context.SaveChangesAsync();

            return $"{id} Updated";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }

        }
    }
}
