namespace MyVideoGamesStoreAPI.Responses
{
    public class GoogleAccResponse
    {
        public Tuple<int, string> NewSserAddedToDB { get; } = Tuple.Create(0, "Uspešna registracija sa Google nalogom!");
        public Tuple<int, string> LoginSuccess { get; } = Tuple.Create(1, "Uspešna prijava sa Google nalogom!");
    }
}