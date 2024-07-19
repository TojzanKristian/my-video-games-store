using System.Text;

namespace MyVideoGamesStoreAPI.Video_game_key_generator
{
    public class KeyGenerator
    {
        /// <summary>
        /// Generates a Steam activation key.
        /// Generisanje Steam aktivacionog ključa.
        /// </summary>
        /// <returns>A string representing the generated Steam activation key.</returns>
        public static string GenerateKey()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            const int sections = 3;
            const int charsPerSection = 5;
            var random = new Random();
            var keyBuilder = new StringBuilder();

            for (int i = 0; i < sections; i++)
            {
                for (int j = 0; j < charsPerSection; j++)
                {
                    keyBuilder.Append(chars[random.Next(chars.Length)]);
                }
                if (i < sections - 1)
                {
                    keyBuilder.Append('-');
                }
            }

            return keyBuilder.ToString();
        }
    }
}