namespace MyVideoGamesStoreAPI.Responses
{
    public class AddNewGameResponse
    {
        public Tuple<int, string> VideoGameAlreadyExists { get; } = Tuple.Create(-1, "Igrica sa ovim nazivom već postoji u bazi podataka!");
        public Tuple<int, string> SuccessfullyAdded { get; } = Tuple.Create(0, "Igrica je uspešno dodata u sistem!");
    }
}