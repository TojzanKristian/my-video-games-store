namespace MyVideoGamesStoreAPI.DTOs
{
    public class PurchaseDto
    {
        public string? ListOfPurchasedGames { get; set; }
        public string? Price { get; set; }
        public string? BuyerUsername { get; set; }
        public string? DateOfPurchase { get; set; }
    }
}