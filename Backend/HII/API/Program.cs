using API.Extensions;
using API.Middleware;
using Core.Entities;
using Infrastructure.Data.SeedData;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
Console.WriteLine($"Current Environment: {builder.Environment.EnvironmentName}");
var configuration = builder.Configuration;
var env = builder.Environment;
// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddSwaggerDocumentation();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//var enableSwagger = builder.Configuration.GetValue("SwaggerSettings:EnableSwagger");
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseStatusCodePagesWithReExecute("/errors/{0}");

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation(app.Environment);
}

app.UseStaticFiles();

app.MapSwagger();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot")),
    RequestPath = "/wwwroot"

});
app.UseCors("CorsPolicy");

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<StoreContext>();

    // Veritaban? güncel de?ilse, migrations'? uygula
    context.Database.Migrate();

    // Seed i?lemleri burada yap?l?r
    await SeedData.Initialize(services);  // SeedData s?n?f? burada tan?mlanacak
}

app.MapFallbackToController("Index", "Fallback");

app.Run();
