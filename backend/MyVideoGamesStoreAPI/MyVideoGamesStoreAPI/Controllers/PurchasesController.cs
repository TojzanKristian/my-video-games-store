using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVideoGamesStoreAPI.Database.Games;
using MyVideoGamesStoreAPI.Database.Purchases;
using MyVideoGamesStoreAPI.Database.Users;
using MyVideoGamesStoreAPI.DTOs;
using MyVideoGamesStoreAPI.Models;
using MyVideoGamesStoreAPI.Notification_via_email;
using MyVideoGamesStoreAPI.Requests;
using MyVideoGamesStoreAPI.Video_game_key_generator;
using System.Diagnostics;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyVideoGamesStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly ILogger<PurchasesController> _logger;
        private readonly UsersRepository _usersRepository;
        private readonly PurchasesRepository _purchasesRepository;
        private readonly GamesRepository _gamesRepository;
        private readonly IMapper _mapper;
        private readonly EmailSender _emailSender = new();
        private readonly KeyGenerator _keyGenerator = new();
        private readonly FilesController _filesController;
        private readonly string _bucketName = "my-video-games-store-images";

        public PurchasesController(ILogger<PurchasesController> logger, UsersRepository usersRepository, PurchasesRepository purchasesRepository, GamesRepository gamesRepository, IMapper mapper, FilesController filesController)
        {
            _logger = logger;
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _purchasesRepository = purchasesRepository ?? throw new ArgumentNullException(nameof(purchasesRepository));
            _gamesRepository = gamesRepository ?? throw new ArgumentNullException(nameof(gamesRepository));
            _mapper = mapper;
            _filesController = filesController;
        }

        /// <summary>
        /// POST method.
        /// Handles the request to add a new purchase.
        /// Obrada zahteva za dodavanje nove kupovine.
        /// </summary>
        /// <param name="request">The purchase request containing purchase details.</param>
        /// <returns>An IActionResult indicating the result of the purchase addition.</returns>
        [Authorize]
        [HttpPost("newPurchase")]
        public async Task<IActionResult> AddNewPurchase([FromBody] PurchaseRequest request)
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
                            string purchaseTime = $"{DateTime.Now:yyyy.MM.dd.HH:mm: ss}";
                            string message = $"\nPurchase details:\n" +
                                      $"\t\tList of purchased games: {request.ListOfPurchasedGames}\n" +
                                      $"\t\tPrice: {request.Price}\n" +
                                      $"\t\tBuyer: {loggedInUser.UserName}\n" +
                                      $"\t\tPurchase time: {purchaseTime}\n";

                            Debug.WriteLine(message);
                            _logger.LogInformation(message);
                            Purchase newPurchase = new(request.ListOfPurchasedGames, request.Price, loggedInUser.UserName, purchaseTime);
                            bool retVal = await _purchasesRepository.AddNewPurchase(newPurchase);
                            if (retVal)
                            {
                                string successMessage = "Uspešna kupovina!";
                                Debug.WriteLine(successMessage + "\n");
                                _logger.LogInformation(successMessage + "\n");
                                await CustomerNotification(newPurchase);
                                return Ok(new { message = successMessage });
                            }
                            else
                            {
                                string errorMessage = "Došlo je do greške tokom obrade kupovine!";
                                Debug.WriteLine(errorMessage + "\n");
                                _logger.LogError(errorMessage + "\n");
                                return Ok(new { message = errorMessage });
                            }
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while adding the purchase to the database!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom dodavanja nove kupovine u bazu podataka!");
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

        /// <summary>
        /// GET method.
        /// Retrieves all purchases from the database for admin.
        /// Preuzimanje svih kupovina iz baze podataka za prikaz adminu.
        /// </summary>
        /// <returns>An IActionResult containing a list of all purchases.</returns>
        [Authorize]
        [HttpGet("getAllPurchases")]
        public async Task<IActionResult> GetAllPurchasesAdmin()
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
                            var allPurchasesFromDB = await _purchasesRepository.GetPurchases();
                            List<PurchaseDto> allPurchases = _mapper.Map<List<PurchaseDto>>(allPurchasesFromDB);
                            string message = "\nList of all purchases:\n";
                            foreach (var purchase in allPurchases)
                            {
                                message += $"\t\tList of purchased games: {purchase.ListOfPurchasedGames}\n" +
                                           $"\t\tPrice: {purchase.Price}\n" +
                                           $"\t\tBuyer username: {purchase.BuyerUsername}\n" +
                                           $"\t\tDate of purchase: {purchase.DateOfPurchase}\n\n";
                            }

                            Debug.WriteLine(message);
                            _logger.LogInformation(message);
                            return Ok(new { data = allPurchases, email = loggedInUser.Email });
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while reading all purchases from the database!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom čitanja svih kupovina iz baze podataka!");
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

        /// <summary>
        /// GET method.
        /// Retrieves all purchases from the database for admin access.
        /// Preuzimanje svih kupovina iz baze podataka za prikaz adminu.
        /// </summary>
        /// <returns>An IActionResult containing a list of all purchases.</returns>
        [Authorize]
        [HttpGet("myGames")]
        public async Task<IActionResult> GetPurchasedGames()
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
                            var purchasesFromDBForUser = await _purchasesRepository.GetPurchaseByBuyerUsername(loggedInUser.UserName);
                            List<VideoGame> myVideoGames = [];
                            foreach (var purchase in purchasesFromDBForUser)
                            {
                                if (!string.IsNullOrEmpty(purchase.ListOfPurchasedGames))
                                {
                                    var gameNames = purchase.ListOfPurchasedGames.Split(',');
                                    foreach (var gameName in gameNames)
                                    {
                                        var trimmedGameName = gameName.Trim();
                                        var videoGame = await _gamesRepository.GetVideoGameByName(trimmedGameName);
                                        if (videoGame != null)
                                        {
                                            myVideoGames.Add(videoGame);
                                        }
                                    }
                                }
                            }

                            List<VideoGameDetails> myGames = [];
                            var result = await _filesController.GetAllFilesAsync(_bucketName, null);
                            if (result is OkObjectResult okResult && okResult.Value is IEnumerable<MyS3Object> s3Objects)
                            {
                                var imageUrlDictionary = s3Objects.ToDictionary(
                                    s3Object => _filesController.NormalizeString(s3Object.Name),
                                    s3Object => s3Object.PresignedUrl
                                );

                                foreach (var game in myVideoGames)
                                {
                                    string normalizedGameName = _filesController.NormalizeString(game.Name);
                                    if (imageUrlDictionary.TryGetValue(normalizedGameName, out var imageUrl))
                                    {
                                        var videoGameDetails = new VideoGameDetails(game.Name, game.Category, game.Price, game.YoutubeLink, imageUrl);
                                        myGames.Add(videoGameDetails);
                                    }
                                }
                            }

                            string message = $"\nVideo games for user {loggedInUser.UserName}:\n";
                            foreach (var game in myGames)
                            {
                                message += $"\t\tName: {game.Name}\n" +
                                   $"\t\tCategory: {game.Category}\n" +
                                   $"\t\tPrice: {game.Price}\n";
                            }

                            Debug.WriteLine(message);
                            _logger.LogInformation(message);
                            return Ok(new { data = myGames });
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while reading all purchases from the database!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom čitanja svih kupovina iz baze podataka!");
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

        /// <summary>
        /// Sends a notification email to the customer with the details of their purchase.
        /// Slanje obaveštenja kupcu putem emaila sa detaljima o njegovoj kupovini.
        /// </summary>
        /// <param name="newPurchase">The purchase details of the customer.</param>
        private async Task CustomerNotification(Purchase newPurchase)
        {
            var user = await _usersRepository.GetUserByUserName(newPurchase.BuyerUsername);
            List<VideoGame> PurchasedGames = [];
            if (!string.IsNullOrEmpty(newPurchase.ListOfPurchasedGames))
            {
                var gameNames = newPurchase.ListOfPurchasedGames.Split(',');
                foreach (var gameName in gameNames)
                {
                    var trimmedGameName = gameName.Trim();
                    var videoGame = await _gamesRepository.GetVideoGameByName(trimmedGameName);
                    if (videoGame != null)
                    {
                        PurchasedGames.Add(videoGame);
                    }
                }
            }

            string subject = "Detalji vaše kupovine";
            string messageBody = "<html><body>";
            messageBody += "<h2>Poštovani Kupče,</h2>";
            messageBody += "<p>U nastavku slede detalji o vašim kupljenim igricama:</p>";
            messageBody += "<ul>";

            foreach (var game in PurchasedGames)
            {
                messageBody += "<li>";
                messageBody += $"Naziv igre:<br/>&emsp;&emsp;&emsp;&emsp;<b>{game.Name}</b><br/>";
                messageBody += $"Cena igre:<br/>&emsp;&emsp;&emsp;&emsp;<b>{game.Price}</b><br/>";
                messageBody += $"Ključ za aktivaciju:<br/>&emsp;&emsp;&emsp;&emsp;<b>{KeyGenerator.GenerateKey()}</b><br/>";
                messageBody += "</li><br/>";
            }

            messageBody += "</ul>";
            messageBody += "<p>Hvala vam što kupujete kod nas!</p>";
            messageBody += "<p>TK Store</p>";
            messageBody += "</body></html>";
            _emailSender.SendEmail(user.Email, subject, messageBody);
        }
    }
}