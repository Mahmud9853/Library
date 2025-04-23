using Core.Entities;
using Core.Specifications;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ISlideRepository
    {
        Task<List<Slide>> GetAllSlideAsync();
        Task<Slide> GetByIdSlideAsync(int? id);
        Task AddAsync(Slide slide);
        Task<Slide> UpdateAsync(int? id, Slide slide);
        Task<string> DeleteAsync(int? id);
    }
}
