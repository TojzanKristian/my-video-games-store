using System.Security.Cryptography;
using System.Text;

namespace MyVideoGamesStoreAPI.Encryption
{
    public class SHA256Encryption
    {
        /// <summary>
        /// Computes the SHA-256 hash of the given password string.
        /// Kriptovanje lozinke sa SHA-256.
        /// </summary>
        /// <param name="password">The password string to hash.</param>
        /// <returns>The SHA-256 hash of the input password.</returns>
        public string GetSHA256Hash(string password)
        {
            using SHA256 sha256 = SHA256.Create();
            byte[] bytes = Encoding.UTF8.GetBytes(password);
            byte[] hash = sha256.ComputeHash(bytes);

            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                builder.Append(hash[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
}