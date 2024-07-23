using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVideoGamesStoreAPI.Database.Games;
using MyVideoGamesStoreAPI.Database.Users;
using MyVideoGamesStoreAPI.Models;
using MyVideoGamesStoreAPI.Requests;
using System.Diagnostics;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyVideoGamesStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly ILogger<GamesController> _logger;
        private readonly UsersRepository _usersRepository;
        private readonly GamesRepository _gamesRepository;
        private readonly IMapper _mapper;
        private readonly FilesController _filesController;
        private readonly string _bucketName = "my-video-games-store-images";

        public GamesController(ILogger<GamesController> logger, UsersRepository usersRepository, GamesRepository gamesRepository, IMapper mapper, FilesController filesController)
        {
            _logger = logger;
            _usersRepository = usersRepository ?? throw new ArgumentNullException(nameof(usersRepository));
            _gamesRepository = gamesRepository ?? throw new ArgumentNullException(nameof(gamesRepository));
            _mapper = mapper;
            _filesController = filesController;
        }

        /// <summary>
        /// GET method.
        /// Retrieves all video games from the database.
        /// Obrada zahteva za dobavljanje svih video igrica iz baze podataka.
        /// </summary>
        /// <returns>An IActionResult containing a list of all video games.</returns>
        [HttpGet("allGames")]
        public async Task<IActionResult> GetAllGames()
        {
            try
            {
                var allGamesFromDB = await _gamesRepository.GetGames();
                List<VideoGameDetails> allGames = [];
                var result = await _filesController.GetAllFilesAsync(_bucketName, null);
                if (result is OkObjectResult okResult && okResult.Value is IEnumerable<MyS3Object> s3Objects)
                {
                    var imageUrlDictionary = s3Objects.ToDictionary(
                        s3Object => _filesController.NormalizeString(s3Object.Name),
                        s3Object => s3Object.PresignedUrl
                    );

                    foreach (var game in allGamesFromDB)
                    {
                        string normalizedGameName = _filesController.NormalizeString(game.Name);
                        if (imageUrlDictionary.TryGetValue(normalizedGameName, out var imageUrl))
                        {
                            var videoGameDetails = new VideoGameDetails(game.Name, game.Category, game.Price, game.YoutubeLink, imageUrl);
                            allGames.Add(videoGameDetails);
                        }
                    }
                }

                string message = "\nList of all video games:\n";
                foreach (var game in allGames)
                {
                    message += $"\t\tName: {game.Name}\n" +
                       $"\t\tCategory: {game.Category}\n" +
                       $"\t\tPrice: {game.Price}\n";
                }

                Debug.WriteLine(message);
                _logger.LogInformation(message);
                return Ok(new { data = allGames });
            }
            catch (Exception ex)
            {
                string errorMessage = $"An error occurred while reading all games from the database!\n{ex.Message}\n";
                Debug.WriteLine(errorMessage);
                _logger.LogError(errorMessage);
                return StatusCode(500, "Serverska greška tokom čitanja svih igrica iz baze podataka!");
            }
        }

        /// <summary>
        /// GET method.
        /// Retrieves a video game by its name from the database.
        /// Čitanje video igre iz baze podataka po nazivu.
        /// </summary>
        /// <param name="name">The name of the video game to retrieve.</param>
        /// <returns>The video game model if found; otherwise, null.</returns>
        [HttpGet("name/{name}")]
        public async Task<ActionResult<VideoGame>> GetGameByName(string name)
        {
            Debug.WriteLine($"Received video game name: {name}\n");
            _logger.LogInformation($"Received video game name: {name}\n");
            try
            {
                var videoGameFromDB = await _gamesRepository.GetVideoGameByName(name);
                if (videoGameFromDB != null)
                {
                    VideoGameDetails videoGame = null;
                    var result = await _filesController.GetAllFilesAsync(_bucketName, null);
                    if (result is OkObjectResult okResult && okResult.Value is IEnumerable<MyS3Object> s3Objects)
                    {

                        foreach (var s3Object in s3Objects)
                        {
                            string normalizedS3ObjectName = _filesController.NormalizeString(s3Object.Name);
                            string normalizedName = _filesController.NormalizeString(name);
                            if (normalizedS3ObjectName.Equals(normalizedName, StringComparison.OrdinalIgnoreCase))
                            {
                                videoGame = new(videoGameFromDB.Name, videoGameFromDB.Category, videoGameFromDB.Price, videoGameFromDB.YoutubeLink, s3Object.PresignedUrl);
                                break;
                            }
                        }
                        return Ok(new { data = videoGame });
                    }
                }
            }
            catch (Exception ex)
            {
                string errorMessage = $"An error occurred while retrieving the game from the database!\n{ex.Message}\n";
                Debug.WriteLine(errorMessage);
                _logger.LogError(errorMessage);
                return StatusCode(500, "Serverska greška tokom čitanja igrice iz baze podataka!");
            }

            return BadRequest();
        }

        /// <summary>
        /// POST method.
        /// Handles the request to add a new video game.
        /// Obrada zahteva za dodavanje nove video igre.
        /// </summary>
        /// <param name="model">The video game request model containing game details.</param>
        /// <returns>An IActionResult indicating the result of the game addition.</returns>
        [Authorize]
        [HttpPost("addNewVideoGame")]
        public async Task<IActionResult> AddNewGame([FromForm] VideoGameRequest model)
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
                            string message = $"\nNew video game details:\n" +
                                      $"\t\tName: {model.Name}\n" +
                                      $"\t\tCategory: {model.Category}\n" +
                                      $"\t\tPrice: {model.Price}\n" +
                                      $"\t\tYoutubeLink: {model.YoutubeLink}\n";

                            Debug.WriteLine(message);
                            _logger.LogInformation(message);
                            int returnCode;
                            string successMessage;
                            VideoGame videoGame = new(model.Name, model.Category, model.Price, model.YoutubeLink);
                            var retTuple = await _gamesRepository.AddNewGame(videoGame);
                            returnCode = retTuple.Item1;
                            successMessage = retTuple.Item2;
                            Debug.WriteLine(successMessage + "\n");
                            switch (returnCode)
                            {
                                case -1:
                                    _logger.LogError(successMessage + "\n");
                                    break;
                                default:
                                    _logger.LogInformation(successMessage + "\n");
                                    break;
                            }

                            await _filesController.UploadFileAsync(model.Image, _bucketName, null);
                            return Ok(successMessage);
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while reading all games from the database!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom čitanja svih igrica iz baze podataka!");
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
        /// Retrieves all video games from the database for admin access.
        /// Obrada zahteva za dobavljanje svih video igrica adminu.
        /// </summary>
        /// <returns>An IActionResult containing a list of all video games.</returns>
        [Authorize]
        [HttpGet("getAllGames")]
        public async Task<IActionResult> GetAllGamesAdmin()
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
                            List<VideoGame> allGamesFromDB = await _gamesRepository.GetGames();
                            List<VideoGameDetails> allGames = [];
                            var result = await _filesController.GetAllFilesAsync(_bucketName, null);
                            if (result is OkObjectResult okResult && okResult.Value is IEnumerable<MyS3Object> s3Objects)
                            {
                                var imageUrlDictionary = s3Objects.ToDictionary(
                                    s3Object => _filesController.NormalizeString(s3Object.Name),
                                    s3Object => s3Object.PresignedUrl
                                );

                                foreach (var game in allGamesFromDB)
                                {
                                    string normalizedGameName = _filesController.NormalizeString(game.Name);
                                    if (imageUrlDictionary.TryGetValue(normalizedGameName, out var imageUrl))
                                    {
                                        var videoGameDetails = new VideoGameDetails(game.Name, game.Category, game.Price, game.YoutubeLink, imageUrl);
                                        allGames.Add(videoGameDetails);
                                    }
                                }
                            }

                            string message = "\nList of all video games for Admin:\n";
                            foreach (var game in allGames)
                            {
                                message += $"\t\tName: {game.Name}\n" +
                                   $"\t\tCategory: {game.Category}\n" +
                                   $"\t\tPrice: {game.Price}\n";
                            }

                            Debug.WriteLine(message);
                            _logger.LogInformation(message);
                            return Ok(new { data = allGames, email = loggedInUser.Email });
                        }
                        catch (Exception ex)
                        {
                            string errorMessage = $"An error occurred while reading all games from the database!\n{ex.Message}\n";
                            Debug.WriteLine(errorMessage);
                            _logger.LogError(errorMessage);
                            return StatusCode(500, "Serverska greška tokom čitanja svih igrica iz baze podataka!");
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