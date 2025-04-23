using API.Errors;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repository;
using Infrastructure.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json.Serialization;

namespace API.Extensions
{
    public static class ApplicationServicesExtensions
    {
        
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            
            services.AddDbContext<StoreContext>(option => {
                option.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            
            });

           var builder = services.AddIdentity<AppUser, IdentityRole>(options => {


            })
                .AddEntityFrameworkStores<StoreContext>()
                 .AddSignInManager<SignInManager<AppUser>>()
                .AddDefaultTokenProviders();

            builder = new IdentityBuilder(builder.UserType, builder.Services);
            builder.AddEntityFrameworkStores<StoreContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();

            // Register Identity services

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidIssuer = configuration["Jwt:Issuer"],
                        ValidAudience = configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"])),
                        ClockSkew = TimeSpan.Zero
                    };
                });

            services.AddAuthorization();

            // Memory Cache kullanımı
            services.AddMemoryCache();
            // DI Registration
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IResponseCacheService, ResponseCacheService>();
            services.AddScoped<IBookRepository, BookRepository>();
            services.AddScoped<ITypeRepository, TypeRepository>();
            services.AddScoped<ISlideRepository, SlideRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IAuthorRepository, AuthorRepository>();
            services.AddScoped<IHomeRepository, HomeRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = actionContext =>
                {
                    var errors = actionContext.ModelState
                        .Where(e => e.Value.Errors.Count > 0)
                        .SelectMany(x => x.Value.Errors)
                        .Select(x => x.ErrorMessage).ToArray();

                    ApiValidationErrorResponse errorResponse = new ApiValidationErrorResponse
                    {
                        Errors = errors
                    };
                    return new BadRequestObjectResult(errorResponse);
                };

            });
            //services.Configure<ApiBehaviorOptions>(options =>
            //{
            //    options.InvalidModelStateResponseFactory = actionContext =>
            //    {
            //        var errors = actionContext.ModelState
            //            .Where(e => e.Value.Errors.Count > 0)
            //            .SelectMany(x => x.Value.Errors)
            //            .Select(x => x.ErrorMessage).ToArray();

            //        return new BadRequestObjectResult(new { errors });
            //    };
            //});
            //services.AddAuthorization(options =>
            //{
            //    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
            //});
            services.AddControllers().AddJsonOptions(options => 
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
                options.JsonSerializerOptions.MaxDepth = 64;
            
            });
            services.AddCors(options => 
            {
                options.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4300");
                });
            });

            return services;
        }
    }
}
