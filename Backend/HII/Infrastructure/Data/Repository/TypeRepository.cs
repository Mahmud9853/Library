using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Type = Core.Entities.Type;

namespace Infrastructure.Data.Repository
{
    public class TypeRepository : ITypeRepository
    {
        private readonly StoreContext _context;
        public TypeRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<List<Type>> GetAllTypeAsync()
        {
            List<Type> types = await _context.Type.ToListAsync();
            return types;
        }

        public async Task<Type> GetByIdType(int? id)
        {
            if (id == null)
            {
                throw new Exception();
            }
            Type type = await _context.Type.FirstOrDefaultAsync(x => x.Id == id);
            return type;
        }

        public async Task<string> AddAsync(Type type)
        {
            try
            {
                await _context.AddAsync(type);
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
                 throw new Exception();
            }
            Type type = await _context.Type.FirstOrDefaultAsync(x => x.Id == id);
            if (type == null)
            {
                throw new KeyNotFoundException($"Book with Id {id} not found");
            }
            _context.Type.Remove(type);
            await _context.SaveChangesAsync();
            return $"{id} Deleted";

        }

        public async Task<string> UpdateAsync(int? id, Type type)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                Type dbType = await _context.Type.FirstOrDefaultAsync(x => x.Id == id);
                if (dbType == null)
                {
                    throw new Exception();
                }
                dbType.Name = type.Name;
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
