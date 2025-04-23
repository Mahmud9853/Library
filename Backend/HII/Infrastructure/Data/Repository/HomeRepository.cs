using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repository
{
    public class HomeRepository : IHomeRepository
    {
        private readonly StoreContext _context;
        public HomeRepository(StoreContext context)
        {
            _context = context;
        }

        public async Task<Home> GetByIdTypeAsync(int? id)
        {

            if (id == null)
            {
                return null;
            }
            Home home = await _context.Home.Include(x => x.HomePhotos).FirstOrDefaultAsync(x => x.Id == id);

            if (home == null)
            {
                throw new Exception();

            }

            return home;

        }
        public async Task<string> AddAsync(Home home)
        {
            try
            {

                List<HomePhotos> newsImages = new List<HomePhotos>();
                if (home.Photos != null && home.Photos.Any())
                {
                    home.HomePhotos = new List<HomePhotos>();
                    foreach (IFormFile photo in home.Photos)
                    {
                        if (!FileHelper.IsValidImage(photo))
                            throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");
                        string savedPath = await FileHelper.SaveFileAsync(photo, "wwwroot/images");
                        home.HomePhotos.Add(new HomePhotos
                        {
                            Photo = savedPath

                        });
                    }

                }
                await _context.Home.AddAsync(home);
                await _context.SaveChangesAsync();
                return "Added";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<string> DeleteAsync(int? id)
        {
            try
            {
                if (id == null)
                {

                    throw new ArgumentException("Invalid ID.", nameof(id));
                }
                Home home = await _context.Home.FirstOrDefaultAsync(b => b.Id == id);
                if (home == null)
                {
                    throw new KeyNotFoundException("Book not found.");
                }
                _context.Home.Remove(home);
                await _context.SaveChangesAsync();
                return $"{id}: Deleted.";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }
        public async Task<string> UpdateAsync(int? id, Home home)
        {
            try
            {
                Home dbHome = await _context.Home.FirstOrDefaultAsync(x => x.Id == id);
                if (dbHome == null)
                {
                    return null;
                }
                List<HomePhotos> NewsImages = new List<HomePhotos>();
                if (home.Photos != null && home.Photos.Any())
                {
                    home.HomePhotos = new List<HomePhotos>();
                    foreach (IFormFile photo in home.Photos)
                    {
                        if (!FileHelper.IsValidImage(photo))
                            throw new ArgumentException("Invalid photo type. Only PNG, JPG, and GIF are allowed.");
                        string savedPath = await FileHelper.SaveFileAsync(photo, "wwwroot/images");
                        home.HomePhotos.Add(new HomePhotos
                        {
                            Photo = savedPath

                        });
                    }

                }
                dbHome.Title = home.Title;
                dbHome.Description = home.Description;
                dbHome.HomePhotos = home.HomePhotos;
                await _context.SaveChangesAsync();
                return "Updated";
            }
            catch (Exception ex)
            {

                return ex.Message;
            }
        }

        public async Task<List<Home>> GetAllHomes()
        {
            List<Home> home = await _context.Home.Include(x => x.HomePhotos).ToListAsync();
            return home;
        }

        public async Task<string> DeletePhotoAsync(int? id)
        {
            try
            {
                HomePhotos photo = await _context.HomePhotos.FindAsync(id);
                if (photo == null)
                {
                    return null; // Fotoğraf bulunamadı
                }

                // Fotoğraf dosyasını fiziksel olarak sil
                if (System.IO.File.Exists(photo.Photo))
                {
                    System.IO.File.Delete(photo.Photo);
                }

                // Fotoğraf kaydını veritabanından sil
                _context.HomePhotos.Remove(photo);
                await _context.SaveChangesAsync();

                return "Deleted"; // Başarılı
            }
            catch(Exception ex)
            {
                return ex.Message; // Hata oluştu
            }
        }

        public async Task<Home> GetDefaultHomeAsync()
        {
            Home home = await _context.Home.Include(x => x.HomePhotos).FirstOrDefaultAsync();
            if (home == null)
            {
                throw new Exception();
            }
            return home;
        }
    }
}
