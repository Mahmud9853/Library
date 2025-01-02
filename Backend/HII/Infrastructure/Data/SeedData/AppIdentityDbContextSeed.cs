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
            try
            {
                // Seed Roles
                if (!roleManager.Roles.Any())
                {
                    var roles = new[] { "Admin", "Client" };
                    foreach (var role in roles)
                    {
                        var result = await roleManager.CreateAsync(new IdentityRole(role));
                        if (result.Succeeded)
                        {
                            Console.WriteLine($"Role '{role}' created successfully.");
                        }
                        else
                        {
                            Console.WriteLine($"Failed to create role '{role}': {string.Join(", ", result.Errors.Select(e => e.Description))}");
                        }
                    }
                }

                // Seed Admin User
                if (!userManager.Users.Any())
                {
                    var adminUser = new AppUser
                    {
                        UserName = "Admin",
                        Email = "admin@test.com",
                        Name = "Admin",
                        Surname = "Adminli",
                        BirthDate = new DateTime(2001, 4, 6)
                    };

                    var result = await userManager.CreateAsync(adminUser, "Admin123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(adminUser, "Admin");
                        Console.WriteLine("Admin user created and assigned to role.");
                    }
                    else
                    {
                        Console.WriteLine($"Failed to create admin user: {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred during seeding: {ex.Message}");
                throw;
            }
        }

    }
}
