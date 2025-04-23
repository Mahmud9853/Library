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
    public class HomeConfiguration : IEntityTypeConfiguration<Home>
    {
        public void Configure(EntityTypeBuilder<Home> builder)
        {
            builder.Property(h => h.Id).IsRequired();
            builder.Property(h => h.Title).IsRequired();
            builder.HasMany(h => h.HomePhotos).WithOne(p => p.Home).HasForeignKey(p => p.HomeId);
        }
    }
}
