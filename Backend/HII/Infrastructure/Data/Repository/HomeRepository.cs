﻿using Core.Entities;
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

        public Task<string> DeleteAsync(int? id)
        {
            throw new NotImplementedException();
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
    }
}
