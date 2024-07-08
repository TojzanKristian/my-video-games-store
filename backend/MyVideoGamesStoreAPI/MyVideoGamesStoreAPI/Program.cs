using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Database.Users;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// CORS settings
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Database configuration
builder.Services.AddDbContext<UsersDbContext>(options =>
{
    options.UseSqlServer("Server=KRISZTIAN\\SQLEXPRESS;Database=my-video-games-store;Trusted_Connection=True;TrustServerCertificate=True;Encrypt=false;");
});

builder.Services.AddScoped<UsersRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseCors("ReactPolicy");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
