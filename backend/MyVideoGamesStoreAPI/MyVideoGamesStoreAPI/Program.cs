using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MyVideoGamesStoreAPI.Database.Games;
using MyVideoGamesStoreAPI.Database.Purchases;
using MyVideoGamesStoreAPI.Database.Users;
using MyVideoGamesStoreAPI.Encryption;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// CORS settings
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
});

// Add JwtConfiguration and configure it as a service
builder.Services.AddSingleton<JwtConfiguration>();
builder.Services.Configure<JwtConfiguration>(builder.Configuration.GetSection("JwtSettings"));

// Add JWT authentication
var jwtKeyString = builder.Configuration.GetSection("JwtSettings:Key").Value;
var jwtkey = Encoding.ASCII.GetBytes(jwtKeyString);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(jwtkey),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});

// Database configuration
builder.Services.AddDbContext<UsersDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnectionString"));
});

builder.Services.AddDbContext<GamesDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnectionString"));
});

builder.Services.AddDbContext<PurchasesDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DBConnectionString"));
});

builder.Services.AddScoped<UsersRepository>();
builder.Services.AddScoped<GamesRepository>();
builder.Services.AddScoped<PurchasesRepository>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure AutoMapper
builder.Services.AddAutoMapper(typeof(Program).Assembly);

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
