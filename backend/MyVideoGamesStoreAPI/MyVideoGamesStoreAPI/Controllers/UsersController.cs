using Microsoft.AspNetCore.Mvc;
using MyVideoGamesStoreAPI.Models;
using MyVideoGamesStoreAPI.Requests;
using System.Diagnostics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyVideoGamesStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// POST method.
        /// Handles user registration.
        /// Obrada zahteva za registraciju.
        /// </summary>
        /// <param name="requestModel">The registration request model containing user details.</param>
        /// <returns>An IActionResult indicating the result of the registration.</returns>
        [HttpPost("registration")]
        public IActionResult Registration([FromBody] RegistrationRequest requestModel)
        {
            string message = $"\nRegistration details:\n" +
                      $"\t\tFirstName: {requestModel.FirstName}\n" +
                      $"\t\tLastName: {requestModel.LastName}\n" +
                      $"\t\tUserName: {requestModel.UserName}\n" +
                      $"\t\tEmail: {requestModel.Email}\n" +
                      $"\t\tPassword: {requestModel.Password}\n" +
                      $"\t\tDateOfBirth: {requestModel.DateOfBirth}\n" +
                      $"\t\tCountry: {requestModel.Country}\n" +
                      $"\t\tPhoneNumber: {requestModel.PhoneNumber}";

            Debug.WriteLine(message);
            _logger.LogInformation(message);
            return Ok(new { message = "Uspešna registracija!" });
        }

        /// <summary>
        /// POST method.
        /// Handles user registration/login via Google account.
        /// Obrada zahteva za registraciju/prijavu Google nalogom.
        /// </summary>
        /// <param name="request">The request model containing user details.</param>
        /// <returns>An IActionResult indicating the result of the registration.</returns>
        [HttpPost("googleAccountLogin")]
        public IActionResult GoogleAccountLogin([FromBody] GoogleAccModelRequest request)
        {
            string debugMessage = $"\nGoogle login details:\n" +
            $"\t\tUserName: {request.UserName}\n" +
            $"\t\tFirstName: {request.FirstName}\n" +
            $"\t\tLastName: {request.LastName}\n" +
            $"\t\tEmail: {request.Email}\n";

            Debug.WriteLine(debugMessage);
            return Ok(new { message = "Uspešna prijava Google nalogom!" });
        }

        /// <summary>
        /// POST method.
        /// Handles user login.
        /// Obrada zahteva za prijavu.
        /// </summary>
        /// <param name="model">The request model containing login details.</param>
        /// <returns>An IActionResult indicating the result of the login.</returns>
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest model)
        {
            string message = $"\nLogin details:\n" +
                      $"\t\tEmail: {model.Email}\n" +
                      $"\t\tPassword: {model.Password}\n";

            Debug.WriteLine(message);
            _logger.LogInformation(message);
            return Ok(new { message = "Uspešna prijava!" });
        }

        /// <summary>
        /// GET method.
        /// Retrieves user profile data.
        /// Dobavljanje podataka o korisniku.
        /// </summary>
        /// <returns>An IActionResult containing the user profile data if successful, or a BadRequest if not.</returns>
        [HttpGet("profile")]
        public IActionResult GetProfileData()
        {
            var data = new User()
            {
                FirstName = "John",
                LastName = "Don",
                UserName = "JD",
                Email = "jd@gmail.com",
                Password = "",
                DateOfBirth = "11.08.2024",
                Country = "Serbia",
                PhoneNumber = "062789521369"
            };

            if (data != null)
            {
                string message = $"\nProfile details:\n" +
                          $"\t\tFirstName: {data.FirstName}\n" +
                          $"\t\tLastName: {data.LastName}\n" +
                          $"\t\tUserName: {data.UserName}\n" +
                          $"\t\tEmail: {data.Email}\n" +
                          $"\t\tPassword: {data.Password}\n" +
                          $"\t\tDateOfBirth: {data.DateOfBirth}\n" +
                          $"\t\tCountry: {data.Country}\n" +
                          $"\t\tPhoneNumber: {data.PhoneNumber}";

                Debug.WriteLine(message);
                _logger.LogInformation(message);
                return Ok(data);
            }
            return BadRequest();
        }

        /// <summary>
        /// PUT method.
        /// Updating user profile data.
        /// Obrada zahteva za ažuriranje profila.
        /// </summary>
        /// <returns>An IActionResult containing a message indicating the successful modification of the profile data.</returns>
        [HttpPut("editProfile")]
        public IActionResult EditProfile([FromBody] ProfileRequest request)
        {
            string message = $"\nEdit profile details:\n" +
                       $"\t\tFirstName: {request.FirstName}\n" +
                       $"\t\tLastName: {request.LastName}\n" +
                       $"\t\tUserName: {request.UserName}\n" +
                       $"\t\tEmail: {request.Email}\n" +
                       $"\t\tOld Password: {request.OldPassword}\n" +
                       $"\t\tNew Password: {request.NewPassword}\n" +
                       $"\t\tDateOfBirth: {request.DateOfBirth}\n" +
                       $"\t\tCountry: {request.Country}\n" +
                       $"\t\tPhoneNumber: {request.PhoneNumber}";

            Debug.WriteLine(message);
            _logger.LogInformation(message);
            return Ok(new { message = "Podaci su uspešno ažurirani!" });
        }
    }
}