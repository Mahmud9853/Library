using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface IHomeRepository
    {
        Task<List<Home>> GetAllHomes();
        Task<Home> GetByIdTypeAsync(int? id);
        Task<string> DeleteAsync(int? id);
        Task<string> AddAsync(Home home);
        Task<string> UpdateAsync(int? id, Home home);
        Task<string> DeletePhotoAsync(int? id);
        Task<Home> GetDefaultHomeAsync();
    }
}
