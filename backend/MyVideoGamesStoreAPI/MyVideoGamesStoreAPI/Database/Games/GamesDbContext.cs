using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Database.Games
{
    public class GamesDbContext : DbContext
    {
        public DbSet<VideoGame> Games { get; set; }

        public GamesDbContext(DbContextOptions<GamesDbContext> options) : base(options)
        {
        }
    }
}