namespace MyVideoGamesStoreAPI.Models
{
    public class VideoGameDetails
    {
        public string? Name { get; set; }
        public string? Category { get; set; }
        public string? Price { get; set; }
        public string? YoutubeLink { get; set; }
        public string? ImageUrl { get; set; }

        public VideoGameDetails(string? name, string? category, string? price, string? youtubeLink, string? imageUrl)
        {
            Name = name;
            Category = category;
            Price = price;
            YoutubeLink = youtubeLink;
            ImageUrl = imageUrl;
        }
    }
}