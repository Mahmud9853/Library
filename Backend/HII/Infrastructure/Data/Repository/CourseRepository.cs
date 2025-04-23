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
    public class CourseRepository : ICourseRepository
    {
        private readonly StoreContext _context;
        public CourseRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<string> AddAsync(Course course)
        {
            try{ 
                await _context.AddAsync(course);
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
                Course course = await _context.Course.FirstOrDefaultAsync(x => x.Id == id);
                if (course == null)
                {
                    throw new KeyNotFoundException($"Book with Id {id} not found");
                }
                _context.Remove(course);
                await _context.SaveChangesAsync();
                return $"{id} Deleted";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
          
        }

        public async Task<List<Course>> GetAllCourseAsync()
        {
            List<Course> course = await _context.Course.ToListAsync();
            return course;
        }
        public async Task<Course> GetByIdCourseAsync(int? id)
        {
            Course course = await _context.Course.FirstOrDefaultAsync(x => x.Id == id);
            return course;
        }
        public async Task<string> UpdateAsync(int? id, Course course)
        {
            try
            {
                if (id == null)
                {
                    return null;
                }
                Course dbCourse = await _context.Course.FirstOrDefaultAsync(x => x.Id == id);
                if (dbCourse == null)
                {
                    throw new KeyNotFoundException($"Book with Id {id} not found");
                }
                dbCourse.Title = course.Title;
                dbCourse.Description = course.Description;

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
