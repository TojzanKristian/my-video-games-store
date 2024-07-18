using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVideoGamesStoreAPI.Database.Users;
using MyVideoGamesStoreAPI.DTOs;
using MyVideoGamesStoreAPI.Encryption;
using MyVideoGamesStoreAPI.Models;
using MyVideoGamesStoreAPI.Requests;
using System.Diagnostics;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyVideoGamesStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;
        private readonly UsersRepository _usersRepository;
        private readonly JwtConfiguration _jwtConfiguration;
        private readonly SHA256Encryption _sHA256Encryption = new();
        private readonly IMapper _mapper;

        public UsersController(ILogger<UsersController> logger, UsersRepository usersRepository, JwtConfiguration jwtConfiguration, IMapper mapper)
        {
            _logger = logger;
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _jwtConfiguration = jwtConfiguration;
            _mapper = mapper;
        }

        /// <summary>
        /// POST method.
        /// Handles user registration.
        /// Obrada zahteva za registraciju.
        /// </summary>
        /// <param name="requestModel">The registration request model containing user details.</param>
        /// <returns>An IActionResult indicating the result of the registration.</returns>
        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] RegistrationRequest requestModel)
        {
            string encryptedPassword = _sHA256Encryption.GetSHA256Hash(requestModel.Password);
            string message = $"\nRegistration details:\n" +
                      $"\t\tFirstName: {requestModel.FirstName}\n" +
                      $"\t\tLastName: {requestModel.LastName}\n" +
                      $"\t\tUserName: {requestModel.UserName}\n" +
                      $"\t\tEmail: {requestModel.Email}\n" +
                      $"\t\tPassword: {encryptedPassword}\n" +
                      $"\t\tDateOfBirth: {requestModel.DateOfBirth}\n" +
                      $"\t\tCountry: {requestModel.Country}\n" +
                      $"\t\tPhoneNumber: {requestModel.PhoneNumber}\n";

            Debug.WriteLine(message);
            _logger.LogInformation(message);
            int returnCode;
            string successMessage;
            try
            {
                User newUser = new(requestModel.FirstName, requestModel.LastName, requestModel.UserName, requestModel.Email, encryptedPassword, requestModel.DateOfBirth, requestModel.Country, requestModel.PhoneNumber);
                var retTuple = await _usersRepository.AddUser(newUser);
                returnCode = retTuple.Item1;
                successMessage = retTuple.Item2;
                Debug.WriteLine(successMessage + "\n");
                switch (returnCode)
                {
                    case -2:
                        _logger.LogWarning(successMessage + "\n");
                        break;
                    case -1:
                        _logger.LogWarning(successMessage + "\n");
                        break;
                    default:
                        _logger.LogInformation(successMessage + "\n");
                        break;
                }
            }
            catch (Exception ex)
            {
                string errorMessage = $"An error occurred while adding the user with the username {requestModel.UserName} to the database!\n{ex.Message}\n";
                Debug.WriteLine(errorMessage);
                _logger.LogError(errorMessage);
                return StatusCode(500, "Serverska greška tokom dodavanja korisnika u bazu podataka!");
            }

            return Ok(new { responseCode = returnCode, message = successMessage });
        }

        /// <summary>
        /// POST method.
        /// Handles user registration/login via Google account.
        /// Obrada zahteva za registraciju/prijavu Google nalogom.
        /// </summary>
        /// <param name="request">The request model containing user details.</param>
        /// <returns>An IActionResult indicating the result of the registration/login via Google account..</returns>
        [HttpPost("googleAccountLogin")]
        public async Task<IActionResult> GoogleAccountLogin([FromBody] GoogleAccModelRequest request)
        {
            string message = $"\nGoogle login details:\n" +
                      $"\t\tUserName: {request.UserName}\n" +
                      $"\t\tFirstName: {request.FirstName}\n" +
                      $"\t\tLastName: {request.LastName}\n" +
                      $"\t\tEmail: {request.Email}\n";

            Debug.WriteLine(message);
            _logger.LogInformation(message);
            int returnCode;
            string successMessage;
            try
            {
                User newUser = new(request.FirstName, request.LastName, request.UserName, request.Email, "", "", "", "");
                var retTuple = await _usersRepository.GoogleAccountLogin(newUser);
                returnCode = retTuple.Item1;
                successMessage = retTuple.Item2;
                Debug.WriteLine(successMessage + "\n");
                _logger.LogInformation(successMessage + "\n");
            }
            catch (Exception ex)
            {
                string errorMessage = $"An error occurred while adding the user with the username {request.UserName} to the database!\n{ex.Message}\n";
                Debug.WriteLine(errorMessage);
                _logger.LogError(errorMessage);
                return StatusCode(500, "Serverska greška tokom prijave sa Google nalogom!");
            }

            var loggedInUser = await _usersRepository.GetUserByEmail(request.Email);
            var tokenString = _jwtConfiguration.GenerateToken(loggedInUser);
            return Ok(new { responseCode = returnCode, message = successMessage, token = tokenString });
        }

        /// <summary>
        /// POST method.
        /// Handles user login.
        /// Obrada zahteva za prijavu.
        /// </summary>
        /// <param name="model">The request model containing login details.</param>
        /// <returns>An IActionResult indicating the result of the login.</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            string encryptedPassword = _sHA256Encryption.GetSHA256Hash(model.Password);
            string message = $"\nLogin details:\n" +
                      $"\t\tEmail: {model.Email}\n" +
                      $"\t\tPassword: {encryptedPassword}\n";

            Debug.WriteLine(message);
            _logger.LogInformation(message);
            int returnCode;
            string successMessage;
            try
            {
                var retTuple = await _usersRepository.AuthenticateUser(model.Email, encryptedPassword);
                returnCode = retTuple.Item1;
                successMessage = retTuple.Item2;
                Debug.WriteLine(successMessage + "\n");
                switch (returnCode)
                {
                    case -2:
                        _logger.LogError(successMessage + "\n");
                        break;
                    case -1:
                        _logger.LogWarning(successMessage + "\n");
                        break;
                    default:
                        _logger.LogInformation(successMessage + "\n");
                        break;
                }
            }
            catch (Exception ex)
            {
                string errorMessage = $"An error occurred during user authentication!\n{ex.Message}\n";
                Debug.WriteLine(errorMessage);
                _logger.LogError(errorMessage);
                return StatusCode(500, "Serverska greška tokom prijave korisnika!");
            }

            if (returnCode == 0)
            {
                var loggedInUser = await _usersRepository.GetUserByEmail(model.Email);
                var tokenString = _jwtConfiguration.GenerateToken(loggedInUser);
                return Ok(new { responseCode = returnCode, message = successMessage, token = tokenString, email = model.Email });
            }

            return Ok(new { responseCode = returnCode, message = successMessage });
        }

        /// <summary>
        /// GET method.
        /// Retrieves user profile data.
        /// Dobavljanje podataka o korisniku.
        /// </summary>
        /// <returns>An IActionResult containing the user profile data if successful, or a BadRequest if not.</returns>
        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> GetProfileData()
        {
            var userNameClaim = User.Claims.FirstOrDefault(c => c.Type.Equals(ClaimTypes.Name))?.Value;
            if (!string.IsNullOrEmpty(userNameClaim))
            {
                try
                {
                    var user = await _usersRepository.GetUserByUserName(userNameClaim);
                    if (user != null)
                    {
                        UserDto userDTO = _mapper.Map<UserDto>(user);
                        string message = $"\nProfile details:\n" +
                                  $"\t\tFirstName: {userDTO.FirstName}\n" +
                                  $"\t\tLastName: {userDTO.LastName}\n" +
                                  $"\t\tUserName: {userDTO.UserName}\n" +
                                  $"\t\tEmail: {userDTO.Email}\n" +
                                  $"\t\tDateOfBirth: {userDTO.DateOfBirth}\n" +
                                  $"\t\tCountry: {userDTO.Country}\n" +
                                  $"\t\tPhoneNumber: {userDTO.PhoneNumber}\n";

                        Debug.WriteLine(message);
                        _logger.LogInformation(message);
                        return Ok(userDTO);
                    }
                }
                catch (Exception ex)
                {
                    string errorMessage = $"An error occurred while reading the user from the database!\n{ex.Message}\n";
                    Debug.WriteLine(errorMessage);
                    _logger.LogError(errorMessage);
                    return StatusCode(500, "Serverska greška tokom čitanja podataka o korisniku iz baze podataka!");
                }
            }

            return BadRequest();
        }

        /// <summary>
        /// PUT method.
        /// Updating user profile data.
        /// Obrada zahteva za ažuriranje profila.
        /// </summary>
        /// <returns>An IActionResult containing a message indicating the successful modification of the profile data.</returns>
        [Authorize]
        [HttpPut("editProfile")]
        public async Task<IActionResult> EditProfile([FromBody] ProfileRequest request)
        {
            var userNameClaim = User.Claims.FirstOrDefault(c => c.Type.Equals(ClaimTypes.Name))?.Value;
            if (!string.IsNullOrEmpty(userNameClaim))
            {
                try
                {
                    var user = await _usersRepository.GetUserByUserName(userNameClaim);
                    if (user != null)
                    {
                        string encryptedOldPassword = string.Empty;
                        string encryptedNewPassword = string.Empty;
                        if (!request.OldPassword.Equals(string.Empty))
                        {
                            encryptedOldPassword = _sHA256Encryption.GetSHA256Hash(request.OldPassword);
                        }
                        if (!request.NewPassword.Equals(string.Empty))
                        {
                            encryptedNewPassword = _sHA256Encryption.GetSHA256Hash(request.NewPassword);
                        }
                        string message = $"\nEdit profile details:\n" +
                                  $"\t\tFirstName: {request.FirstName}\n" +
                                  $"\t\tLastName: {request.LastName}\n" +
                                  $"\t\tUserName: {request.UserName}\n" +
                                  $"\t\tEmail: {request.Email}\n" +
                                  $"\t\tOld Password: {encryptedOldPassword}\n" +
                                  $"\t\tNew Password: {encryptedNewPassword}\n" +
                                  $"\t\tDateOfBirth: {request.DateOfBirth}\n" +
                                  $"\t\tCountry: {request.Country}\n" +
                                  $"\t\tPhoneNumber: {request.PhoneNumber}\n";

                        Debug.WriteLine(message);
                        _logger.LogInformation(message);
                        int returnCode;
                        string successMessage;
                        User modifiedUserData = new(request.FirstName, request.LastName, request.UserName, request.Email, encryptedNewPassword, request.DateOfBirth, request.Country, request.PhoneNumber);
                        try
                        {
                            var retTuple = await _usersRepository.UpdateUser(user, encryptedOldPassword, modifiedUserData);
                            returnCode = retTuple.Item1;
                            successMessage = retTuple.Item2;
                            Debug.WriteLine(successMessage + "\n");
                            if (returnCode == -2 || returnCode == -1)
                            {
                                _logger.LogError(successMessage + "\n");
                            }
                            else
                            {
                                _logger.LogInformation(successMessage + "\n");
                            }
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while updating user data!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom ažuriranja podataka korisnika!");
                        }

                        return Ok(new { responseCode = returnCode, message = successMessage });
                    }
                }
                catch (Exception ex)
                {
                    string errorMessage = $"An error occurred while reading the user from the database!\n{ex.Message}\n";
                    Debug.WriteLine(errorMessage);
                    _logger.LogError(errorMessage);
                    return StatusCode(500, "Serverska greška tokom čitanja podataka o korisniku iz baze podataka!");
                }
            }

            return BadRequest();
        }

        /// <summary>
        /// GET method.
        /// Handles fetching all users for the admin.
        /// Obrada zahteva za dobavljanje svih korisnika za prikaz adminu.
        /// </summary>
        /// <returns>An IActionResult indicating the result of the operation.</returns>
        [Authorize]
        [HttpGet("getAllUsers")]
        public async Task<IActionResult> GetAllUsersForAdmin()
        {
            var userNameClaim = User.Claims.FirstOrDefault(c => c.Type.Equals(ClaimTypes.Name))?.Value;
            if (!string.IsNullOrEmpty(userNameClaim))
            {
                try
                {
                    var loggedInUser = await _usersRepository.GetUserByUserName(userNameClaim);
                    if (loggedInUser != null)
                    {
                        try
                        {
                            List<User> allUsersFromDB = await _usersRepository.GetUsers();
                            List<UserDto> allUsers = _mapper.Map<List<UserDto>>(allUsersFromDB);
                            string message = "\nList of all users for Admin:\n";
                            foreach (var user in allUsers)
                            {
                                message += $"\t\tFirstName: {user.FirstName}\n" +
                                   $"\t\tLastName: {user.LastName}\n" +
                                   $"\t\tUserName: {user.UserName}\n" +
                                   $"\t\tEmail: {user.Email}\n" +
                                   $"\t\tDateOfBirth: {user.DateOfBirth}\n" +
                                   $"\t\tCountry: {user.Country}\n" +
                                   $"\t\tPhoneNumber: {user.PhoneNumber}\n";
                            }

                            Debug.WriteLine(message);
                            _logger.LogInformation(message);
                            return Ok(new { data = allUsers, email = loggedInUser.Email });
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while reading all users from the database!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom čitanja svih korisnika iz baze podataka!");
                        }
                    }
                }
                catch (Exception ex)
                {
                    string errorMessage = $"An error occurred while reading the user from the database!\n{ex.Message}\n";
                    Debug.WriteLine(errorMessage);
                    _logger.LogError(errorMessage);
                    return StatusCode(500, "Serverska greška tokom čitanja podataka o korisniku iz baze podataka!");
                }
            }

            return BadRequest();
        }
    }
}