using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

public class SeedData
{
    public static async Task Initialize(IServiceProvider serviceProvider)
    {
        var userManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();
        var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
        var logger = serviceProvider.GetRequiredService<ILogger<SeedData>>();

        // Rol ekleme
        var roleName = "Admin";
        var roleExist = await roleManager.RoleExistsAsync(roleName);
        if (!roleExist)
        {
            await roleManager.CreateAsync(new IdentityRole(roleName));
            logger.LogInformation("Admin rolü oluşturuldu.");
        }

        // Kullanıcı ekleme
        var user = await userManager.FindByEmailAsync("admin@example.com");
        if (user == null)
        {
            user = new AppUser
            {
                UserName = "Admin01",
                Email = "admin@example.com",
                Name = "Admin",
                Surname = "Adminli",
                BirthDate = new DateTime(1980, 1, 1)
            };

            var result = await userManager.CreateAsync(user, "Admin123!");
            if (result.Succeeded)
            {
                // Kullanıcıya rol ver
                await userManager.AddToRoleAsync(user, "Admin");
                logger.LogInformation("Admin kullanıcısı oluşturuldu ve role atandı.");
            }
            else
            {
                logger.LogError("Kullanıcı oluşturulamadı.");
            }
        }
    }
}
