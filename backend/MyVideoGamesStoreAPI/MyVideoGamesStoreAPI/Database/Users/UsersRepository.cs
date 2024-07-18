using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Models;
using MyVideoGamesStoreAPI.Responses;

namespace MyVideoGamesStoreAPI.Database.Users
{
    public class UsersRepository
    {
        private readonly UsersDbContext _dbContext;
        private readonly AuthenticationResponse _authenticationResponse = new();
        private readonly RegistrationResponse _registrationResponse = new();
        private readonly GoogleAccResponse _googleAccResponse = new();
        private readonly EditProfileResponse _editProfileResponse = new();

        public UsersRepository(UsersDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        /// <summary>
        /// Adds a new user to the database if the username and email are unique.
        /// Dodavanje novog korisnika u bazu podataka, ako ne postoji već neko sa takvim emailom i korisničkim imenom.
        /// </summary>
        /// <param name="user">The user model containing user details.</param>
        /// <returns>A tuple indicating the result of the registration:
        /// - Item1: Status code (-2 for username already exists, -1 for email already exists, 0 for success).
        /// - Item2: Status message corresponding to the registration result.</returns>
        public Task<Tuple<int, string>> AddUser(User user)
        {
            if (_dbContext.Users.Any(u => u.UserName == user.UserName))
            {
                return Task.FromResult(_registrationResponse.AlreadyExistsWithThisUsername);
            }
            if (_dbContext.Users.Any(u => u.Email == user.Email))
            {
                return Task.FromResult(_registrationResponse.AlreadyExistsWithThisEmail);
            }

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return Task.FromResult(_registrationResponse.Success);
        }

        /// <summary>
        /// Retrieves a user by their email from the database.
        /// Pretraga korisnika u bazi podataka po emailu.
        /// </summary>
        /// <param name="email">The email of the user to retrieve.</param>
        /// <returns>The user model if found; otherwise, null.</returns>
        public Task<User> GetUserByEmail(string email)
        {
            return _dbContext.Users.FirstOrDefaultAsync(u => u.Email.Equals(email));
        }

        /// <summary>
        /// Retrieves a user by their username from the database.
        /// Pretraga korisnika u bazi podataka po korisničkom imenu.
        /// </summary>
        /// <param name="userName">The username of the user to retrieve.</param>
        /// <returns>The user model if found; otherwise, null.</returns>
        public Task<User> GetUserByUserName(string userName)
        {
            return _dbContext.Users.FirstOrDefaultAsync(u => u.UserName.Equals(userName));
        }

        /// <summary>
        /// Authenticates a user by their email and password.
        /// Proverava da li korisnik sa datim emailom postoji u bazi i da li je ispravna lozinka.
        /// </summary>
        /// <param name="email">The email of the user to authenticate.</param>
        /// <param name="password">The password of the user to authenticate.</param>
        /// <returns>A tuple containing an authentication status code and message:
        /// - Item1: Status code (-2 for not found, -1 for incorrect password, 0 for authenticated).
        /// - Item2: Status message corresponding to the authentication status.</returns>
        public async Task<Tuple<int, string>> AuthenticateUser(string email, string password)
        {
            var user = await GetUserByEmail(email);
            if (user == null)
            {
                return _authenticationResponse.NotFound;
            }
            if (user.Password != password)
            {
                return _authenticationResponse.IncorrectPassword;
            }

            return _authenticationResponse.Authenticated;
        }

        /// <summary>
        /// Retrieves all users from the database.
        /// Preuzimanje svih korisnika iz baze podataka.
        /// </summary>
        /// <returns>An enumerable collection of User objects representing all users in the database.</returns>
        public Task<List<User>> GetUsers()
        {
            return _dbContext.Users.ToListAsync();
        }

        /// <summary>
        /// Logs in a user using Google account details, adding the user to the database if they do not already exist.
        /// Prijava korisnika pomoću Google naloga i dodavanje korisnika u bazu podataka ako ne postoji.
        /// </summary>
        /// <param name="newUser">The user model containing details retrieved from Google.</param>
        /// <returns>A tuple indicating the result of the login operation:
        /// - Item1: Status code (0 for new user added, 1 for user already existed with the same email).
        /// - Item2: Status message corresponding to the login result.</returns>
        public async Task<Tuple<int, string>> GoogleAccountLogin(User newUser)
        {
            var allUsers = await GetUsers();
            if (allUsers.Count == 0)
            {
                _dbContext.Users.Add(newUser);
                _dbContext.SaveChanges();
                return _googleAccResponse.NewSserAddedToDB;
            }
            else
            {
                bool emailExists = allUsers.Any(u => u.Email.Equals(newUser.Email));
                if (!emailExists)
                {
                    _dbContext.Users.Add(newUser);
                    _dbContext.SaveChanges();
                    return _googleAccResponse.NewSserAddedToDB;
                }
                else
                {
                    return _googleAccResponse.LoginSuccess;
                }
            }
        }

        /// <summary>
        /// Checks if the provided password matches the user's stored password.
        /// Provera da li je uneta lozinka ista kao lozinka korisnika u bazi podataka.
        /// </summary>
        /// <param name="user">The user object containing the stored password.</param>
        /// <param name="password">The password to check against the user's stored password.</param>
        /// <returns>True if the provided password matches the user's stored password, otherwise false.</returns>
        private static bool CheckPassword(User user, string password)
        {
            if (user != null && user.Password.Equals(password))
            {
                return true;
            }

            return false;
        }

        /// <summary>
        /// Updates user information in the database.
        /// Ažuriranje podataka korisnika u bazi podataka.
        /// </summary>
        /// <param name="user">The current user object.</param>
        /// <param name="oldPassword">The old password for verification.</param>
        /// <param name="modifiedUserData">The modified user data to update.</param>
        /// <returns>A tuple containing an integer status code and a string message representing the result of the edit profile operation.
        /// - Item1: Status code (-3 for incorrect password, -2 for username already exists, -1 for email already exists, 0 for successful data modification).
        /// - Item2: Status message corresponding to the edit profile result.</returns>
        public Task<Tuple<int, string>> UpdateUser(User user, string oldPassword, User modifiedUserData)
        {
            if (!oldPassword.Equals(string.Empty))
            {
                if (!CheckPassword(user, oldPassword))
                {
                    return Task.FromResult(_editProfileResponse.IncorrectPassword);
                }
            }
            if (!user.Email.Equals(modifiedUserData.Email))
            {
                if (_dbContext.Users.Any(u => u.Email == modifiedUserData.Email))
                {
                    return Task.FromResult(_editProfileResponse.AlreadyExistsWithThisEmail);
                }
            }

            user.FirstName = modifiedUserData.FirstName;
            user.LastName = modifiedUserData.LastName;
            user.UserName = modifiedUserData.UserName;
            user.Email = modifiedUserData.Email;

            if (!modifiedUserData.Password.Equals(string.Empty))
            {
                user.Password = modifiedUserData.Password;
            }

            user.DateOfBirth = modifiedUserData.DateOfBirth;
            user.Country = modifiedUserData.Country;
            user.PhoneNumber = modifiedUserData.PhoneNumber;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return Task.FromResult(_editProfileResponse.SuccessfullyModifiedData);
        }
    }
}