using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Database.Purchases
{
    public class PurchasesDbContext : DbContext
    {
        public DbSet<Purchase> Purchases { get; set; }

        public PurchasesDbContext(DbContextOptions<PurchasesDbContext> options) : base(options)
        {
        }
    }
}