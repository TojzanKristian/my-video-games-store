using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MyVideoGamesStoreAPI.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyVideoGamesStoreAPI.Encryption
{
    public class JwtConfiguration
    {
        private readonly IConfiguration _configuration;
        private readonly byte[] _JWTkey;

        public JwtConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
            _JWTkey = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Key"]);
        }

        /// <summary>
        /// Configures JWT authentication with the specified services.
        /// Podešavanje JWT autentifikacije.
        /// </summary>
        /// <param name="services">The service collection to configure.</param>
        public void ConfigureJwtAuthentication(IServiceCollection services)
        {
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(_JWTkey),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
        }

        /// <summary>
        /// Generates a JWT token for the specified user.
        /// Generisanje JWT tokena.
        /// </summary>
        /// <param name="user">The user for whom the token is generated.</param>
        /// <returns>The generated JWT token as a string.</returns>
        public string GenerateToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                }),
                NotBefore = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddHours(1000),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_JWTkey), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}