namespace MyVideoGamesStoreAPI.Requests
{
    public class VideoGameRequest
    {
        public string? Name { get; set; }
        public string? Category { get; set; }
        public string? Price { get; set; }
        public string? YoutubeLink { get; set; }
        public IFormFile? Image { get; set; }
    }
}