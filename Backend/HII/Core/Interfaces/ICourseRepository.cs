using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllCourseAsync();
        Task<Course> GetByIdCourseAsync(int? id);
        Task<string> DeleteAsync(int? id);
        Task<string> UpdateAsync(int? id, Course course);
        Task<string> AddAsync(Course course);
    }
}
