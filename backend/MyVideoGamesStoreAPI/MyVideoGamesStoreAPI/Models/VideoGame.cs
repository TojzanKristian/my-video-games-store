namespace MyVideoGamesStoreAPI.Models
{
    public class VideoGame
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Category { get; set; }
        public string? Price { get; set; }
        public string? YoutubeLink { get; set; }

        public VideoGame(string? name, string? category, string? price, string? youtubeLink)
        {
            Name = name;
            Category = category;
            Price = price;
            YoutubeLink = youtubeLink;
        }
    }
}