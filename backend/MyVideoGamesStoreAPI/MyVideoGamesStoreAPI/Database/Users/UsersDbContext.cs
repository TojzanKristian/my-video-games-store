using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Database.Users
{
    public class UsersDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public UsersDbContext(DbContextOptions options) : base(options)
        {
        }
    }
}