using Microsoft.EntityFrameworkCore;
using MyVideoGamesStoreAPI.Models;
using MyVideoGamesStoreAPI.Responses;

namespace MyVideoGamesStoreAPI.Database.Games
{
    public class GamesRepository
    {
        private readonly GamesDbContext _dbContext;
        private readonly AddNewGameResponse _addNewGameResponse = new();

        public GamesRepository(GamesDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        /// <summary>
        /// Adds a new video game to the database if a game with the same name does not already exist.
        /// Dodavanje nove igrice u bazu podataka, ako ne postoji već neka sa takvim imenom.
        /// </summary>
        public Task<Tuple<int, string>> AddNewGame(VideoGame game)
        {
            if (_dbContext.Games.Any(g => g.Name.Equals(game.Name)))
            {
                return Task.FromResult(_addNewGameResponse.VideoGameAlreadyExists);
            }

            _dbContext.Games.Add(game);
            _dbContext.SaveChanges();
            return Task.FromResult(_addNewGameResponse.SuccessfullyAdded);
        }

        /// <summary>
        /// Retrieves all video games from the database.
        /// Preuzimanje svih igrica iz baze podataka.
        /// </summary>
        /// <returns>An enumerable collection of VideoGame objects representing all video games in the database.</returns>
        public Task<List<VideoGame>> GetGames()
        {
            return _dbContext.Games.ToListAsync();
        }

        /// <summary>
        /// Retrieves a video game by its name from the database.
        /// Pretraga video igre u bazi podataka po nazivu.
        /// </summary>
        /// <param name="name">The name of the video game to retrieve.</param>
        /// <returns>The video game model if found; otherwise, null.</returns>
        public Task<VideoGame> GetVideoGameByName(string name)
        {
            return _dbContext.Games.FirstOrDefaultAsync(g => g.Name.Equals(name));
        }
    }
}