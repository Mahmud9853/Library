using Microsoft.OpenApi.Models;

namespace API.Extensions
{
    public static class SwaggerServiceExtensions
    {
        public static IServiceCollection AddSwaggerDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "e-Kitabxana API", Version = "v1" });

                var securitySchema = new OpenApiSecurityScheme
                {
                    Description = "JWT Auth Bearer Scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                };

                c.AddSecurityDefinition("Bearer", securitySchema);
                var securityRequirement = new OpenApiSecurityRequirement { { securitySchema, new[] { "Bearer" } } };
                c.AddSecurityRequirement(securityRequirement);
            });

            return services;
        }

        public static IApplicationBuilder UseSwaggerDocumentation(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || app.ApplicationServices.GetService<IConfiguration>().GetValue<bool>("SwaggerSettings:EnableSwagger")) // Production rejimində Swagger-i aktiv etmə
            {
                 Console.WriteLine("Swagger Enabled (Development Mode)");
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "e-Kitabxana API v1");
                    //c.RoutePrefix = string.Empty;
                });
            }
            else
            {
                Console.WriteLine("Swagger Disabled (Production Mode)");

                app.Use(async (context, next) =>
                {
                    if (context.Request.Path.StartsWithSegments("/swagger"))
                    {
                        Console.WriteLine("Redirecting Swagger Access in Production");
                        context.Response.Redirect("/");
                        return;
                    }

                    await next();
                });

                app.UseSwagger(); // 404 hatası almamak için Swagger servisini enable bırakın.
            }


            return app;
        }
    }
}
