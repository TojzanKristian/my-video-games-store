namespace MyVideoGamesStoreAPI.Responses
{
    public class EditProfileResponse
    {
        public Tuple<int, string> IncorrectPassword { get; } = Tuple.Create(-2, "Uneli ste pogrešnu trenutnu lozinku!");
        public Tuple<int, string> AlreadyExistsWithThisEmail { get; } = Tuple.Create(-1, "Već postoji korisnik sa ovom email adresom!");
        public Tuple<int, string> SuccessfullyModifiedData { get; } = Tuple.Create(0, "Uspešno ste ažurirali vaše podatke!");
    }
}