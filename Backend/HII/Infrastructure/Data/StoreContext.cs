using Type = Core.Entities.Type;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class StoreContext : IdentityDbContext<AppUser>
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Home> Home { get; set; }
        public DbSet<HomePhotos> HomePhotos { get; set; }
        public DbSet<Type> Type { get; set; }
        public DbSet<Author> Author { get; set; }
        public DbSet<Slide> Slide { get; set; }
        public DbSet<Course> Course { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        }
    }
}
