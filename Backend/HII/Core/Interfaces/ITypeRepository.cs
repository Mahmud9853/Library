using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Type = Core.Entities.Type;

namespace Core.Interfaces
{
    public interface ITypeRepository
    {
        Task<List<Type>> GetAllTypeAsync();
        Task<Type> GetByIdType(int? id);
        Task<string> DeleteAsync(int? id);
        Task<string> AddAsync(Type type);
        Task<string> UpdateAsync(int? id, Type type);
    }
}
