namespace MyVideoGamesStoreAPI.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public string? ListOfPurchasedGames { get; set; }
        public string? Price { get; set; }
        public string? BuyerUsername { get; set; }
        public string? DateOfPurchase { get; set; }

        public Purchase(string? listOfPurchasedGames, string? price, string? buyerUsername, string? dateOfPurchase)
        {
            ListOfPurchasedGames = listOfPurchasedGames;
            Price = price;
            BuyerUsername = buyerUsername;
            DateOfPurchase = dateOfPurchase;
        }
    }
}