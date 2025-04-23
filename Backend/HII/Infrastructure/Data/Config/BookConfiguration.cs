using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Config
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {
            builder.Property(b => b.Id).IsRequired();
            builder.Property(b => b.Title).IsRequired();
            builder.Property(b => b.Description).IsRequired();
            builder.Property(b => b.CreateBook).IsRequired();
            builder.Property(b => b.Photo);
            builder.Property(b => b.Document).IsRequired();
            builder.HasOne(t => t.Type).WithMany().HasForeignKey(b => b.TypeId);
            builder.HasOne(c => c.Category).WithMany().HasForeignKey(b => b.CategoryId);
            builder.HasOne(a => a.Author).WithMany().HasForeignKey(b => b.AuthorId);
            builder.HasOne(c => c.Course).WithMany().HasForeignKey(b => b.CourseId).IsRequired(false);
        }
    }
}
