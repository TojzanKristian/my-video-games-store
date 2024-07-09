namespace MyVideoGamesStoreAPI.Responses
{
    public class AuthenticationResponse
    {
        public Tuple<int, string> NotFound { get; } = Tuple.Create(-2, "Nemate nalog! Molimo vas registrujte se.");
        public Tuple<int, string> IncorrectPassword { get; } = Tuple.Create(-1, "Pogrešna lozinka!");
        public Tuple<int, string> Authenticated { get; } = Tuple.Create(0, "Uspešno ste se prijavili!");
    }
}