using Microsoft.AspNetCore.Mvc;
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
    }
}