using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Models;

namespace MyVideoGamesStoreAPI.Database.Purchases
{
    public class PurchasesRepository
    {
        private readonly PurchasesDbContext _dbContext;

        public PurchasesRepository(PurchasesDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        /// <summary>
        /// Adds a new purchase to the database.
        /// Dodavanje nove kupovine u bazu podataka.
        /// </summary>
        /// <param name="purchase">The Purchase object to add.</param>
        /// <returns>True if the purchase was added successfully; otherwise, false.</returns>
        public Task<bool> AddNewPurchase(Purchase purchase)
        {
            _dbContext.Purchases.Add(purchase);
            _dbContext.SaveChanges();
            return Task.FromResult(true);
        }

        /// <summary>
        /// Retrieves all purchases from the database.
        /// Preuzimanje svih kupovina iz baze podataka.
        /// </summary>
        /// <returns>An enumerable collection of Purchase objects representing all purchases in the database.</returns>
        public Task<List<Purchase>> GetPurchases()
        {
            return _dbContext.Purchases.ToListAsync();
        }

        /// <summary>
        /// Retrieves all purchases from the database made by a specific user.
        /// Preuzimanje svih kupovina iz baze podataka koje je obavio korisnik sa zadatim korisničkim imenom.
        /// </summary>
        /// <param name="userName">The username of the buyer.</param>
        /// <returns>An enumerable collection of Purchase objects representing all purchases made by the specified user in the database.</returns>
        public Task<List<Purchase>> GetPurchaseByBuyerUsername(string userName)
        {
            return _dbContext.Purchases.Where(p => p.BuyerUsername.Equals(userName)).ToListAsync();
        }
    }
}