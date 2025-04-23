using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public class SlideRepository : ISlideRepository
    {
        private readonly StoreContext _context;
        public SlideRepository(StoreContext context)
        {
            _context = context;
        }
        public async Task<List<Slide>> GetAllSlideAsync()
        {
            List<Slide> slides = await _context.Slide.ToListAsync();
            return slides;
        }

        public async Task<Slide> GetByIdSlideAsync(int? id)
        {
            if (id == null)
            {
                Console.WriteLine("Received null ID.");
                return null;
            }

            Slide slide = await _context.Slide.FirstOrDefaultAsync(x => x.Id == id);
            if (slide == null)
            {
                Console.WriteLine($"Slide with ID {id} not found.");
                throw new KeyNotFoundException($"Slide with Id {id} not found");
            }

            return slide;
        }

        public async Task AddAsync(Slide slide)
        {
            if (slide.Photos != null)
            {
                if (!FileHelper.IsValidImage(slide.Photos))
                    throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");

                slide.Photo = await FileHelper.SaveFileAsync(slide.Photos, "wwwroot/images");
            }
            if (slide == null)
            {
                throw new ArgumentException(nameof(slide), "The book object cannot be null.");
            }
            await _context.Slide.AddAsync(slide);
            await _context.SaveChangesAsync();
        }

        public async Task<string> DeleteAsync(int? id)
        {
            try
            {
                if (id == null)
                {

                    throw new ArgumentException("Invalid ID.", nameof(id));
                }
                Slide slide = await _context.Slide.FirstOrDefaultAsync(x => x.Id == id);
                if (slide == null)
                {
                    throw new KeyNotFoundException("Slide not found.");
                }
                _context.Slide.Remove(slide);
                await _context.SaveChangesAsync();
                return $"{id}: Deleted.";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<Slide> UpdateAsync(int? id, Slide slide)
        {
            if (slide == null)
            {
                throw new ArgumentException(nameof(slide), "the slide object cannot be null");
            }
            Slide dbSlide = await _context.Slide.FirstOrDefaultAsync(x => x.Id == id);
            if (dbSlide == null)
            {
                throw new Exception("Slide not found");
            }
            if (slide.Photos != null)
            {
                if (!FileHelper.IsValidImage(slide.Photos))
                    throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");

                dbSlide.Photo = await FileHelper.SaveFileAsync(slide.Photos, "wwwroot/images");
            }
            await _context.SaveChangesAsync();
            return dbSlide;
        }
    }
}
