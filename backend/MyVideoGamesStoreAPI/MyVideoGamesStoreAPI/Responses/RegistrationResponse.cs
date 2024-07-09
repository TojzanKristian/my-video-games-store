namespace MyVideoGamesStoreAPI.Responses
{
    public class RegistrationResponse
    {
        public Tuple<int, string> AlreadyExistsWithThisUsername { get; } = Tuple.Create(-2, "Već postoji korisnik sa ovim korisničkim imenom!");
        public Tuple<int, string> AlreadyExistsWithThisEmail { get; } = Tuple.Create(-1, "Već postoji korisnik sa ovim emailom!");
        public Tuple<int, string> Success { get; } = Tuple.Create(0, "Uspešna registracija!");
    }
}