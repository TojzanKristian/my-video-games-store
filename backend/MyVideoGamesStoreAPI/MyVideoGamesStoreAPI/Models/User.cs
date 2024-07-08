namespace MyVideoGamesStoreAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Country { get; set; }
        public string? PhoneNumber { get; set; }

        public User()
        {
        }

        public User(string? firstName, string? lastName, string? userName, string? email, string? password, string? dateOfBirth, string? country, string? phoneNumber)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Email = email;
            Password = password;
            DateOfBirth = dateOfBirth;
            Country = country;
            PhoneNumber = phoneNumber;
        }
    }
}