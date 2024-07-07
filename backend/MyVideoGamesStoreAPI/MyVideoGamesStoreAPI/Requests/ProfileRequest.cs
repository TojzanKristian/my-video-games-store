namespace MyVideoGamesStoreAPI.Requests
{
    public class ProfileRequest
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? OldPassword { get; set; }
        public string? NewPassword { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Country { get; set; }
        public string? PhoneNumber { get; set; }
    }
}