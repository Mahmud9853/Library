using Core.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.SeedData
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAndRolesAsync(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
          
                // Seed Roles
                if (!roleManager.Roles.Any())
                {
                    string[] roles = new[] { "Admin", "Client" };
                    foreach (string role in roles)
                    {
                        var roleResult = await roleManager.CreateAsync(new IdentityRole(role));
                        if (roleResult.Succeeded)
                        {
                            Console.WriteLine($"Role '{role}' created successfully.");
                        }
                        else
                        {
                            Console.WriteLine($"Failed to create role '{role}': {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                        }
                    }
                }

                // Admin kullanıcısını ekle (eğer yoksa)
                if (!userManager.Users.Any())
                {
                    var user = new AppUser
                    {
                        UserName = "Admin",
                        Email = "admin@test.com",
                        Name = "Admin",
                        Surname = "Adminli",
                       BirthDate = DateTime.UtcNow.AddHours(4).Date /// UTC saat dilimine göre güncellenmiş
                    };

                    var userResult = await userManager.CreateAsync(user, "Admin123!");
                    if (userResult.Succeeded)
                    {
                        // Admin rolünü kullanıcıya ata
                        await userManager.AddToRoleAsync(user, "Admin");
                        Console.WriteLine("Admin user created and assigned to role.");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to create admin user: {string.Join(", ", userResult.Errors.Select(e => e.Description))}");
                    }
                }

        }

    }
}
