using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyVideoGamesStoreAPI.Migrations.GamesDb
{
    /// <inheritdoc />
    public partial class InsertVideoGames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Games",
                columns: new[] { "Id", "Name", "Category", "Price", "YoutubeLink" },
                values: new object[,]
                {
                    { 1, "The Witcher 3: Wild Hunt", "RPG", "29.99 USD", "https://www.youtube.com/watch?v=XHrskkHf958" },
                    { 2, "Cyberpunk 2077", "RPG", "59.99 USD", "https://www.youtube.com/watch?v=LembwKDo1Dk" },
                    { 3, "Red Dead Redemption 2", "Action", "39.99 USD", "https://www.youtube.com/watch?v=eaW0tYpxyp0" },
                    { 4, "Grand Theft Auto V", "Action", "19.99 USD", "https://www.youtube.com/watch?v=QkkoHAzjnUs" },
                    { 5, "Minecraft", "Sandbox", "26.95 USD", "https://www.youtube.com/watch?v=MmB9b5njVbA" },
                    { 6, "Fortnite", "Battle Royale", "9.99 USD", "https://www.youtube.com/watch?v=2gUtfBmw86Y" },
                    { 7, "God of War", "Action", "49.99 USD", "https://www.youtube.com/watch?v=K0u_kAWLJOA" },
                    { 8, "Call of Duty: Modern Warfare", "Shooter", "59.99 USD", "https://www.youtube.com/watch?v=bH1lHCirCGI" },
                    { 9, "Overwatch", "Shooter", "39.99 USD", "https://www.youtube.com/watch?v=dushZybUYnM" },
                    { 10, "FIFA 21", "Sports", "59.99 USD", "https://www.youtube.com/watch?v=zX0AV6yxyrQ" },
                    { 11, "The Sims 4", "Simulation", "39.99 USD", "https://www.youtube.com/watch?v=G-MgruM4Fso" },
                    { 12, "Assassin's Creed Valhalla", "Action RPG", "59.99 USD", "https://www.youtube.com/watch?v=ssrNcwxALS4" },
                    { 13, "Hades", "Roguelike", "24.99 USD", "https://www.youtube.com/watch?v=DgPnvKkjkrs" },
                    { 14, "Among Us", "Party", "4.99 USD", "https://www.youtube.com/watch?v=CermGp8bwFE" },
                    { 15, "Doom Eternal", "Shooter", "59.99 USD", "https://www.youtube.com/watch?v=dS-ti6XjT4A" },
                    { 16, "Halo Infinite", "Shooter", "59.99 USD", "https://www.youtube.com/watch?v=kL3TVofuJ84" },
                    { 17, "Resident Evil Village", "Horror", "59.99 USD", "https://www.youtube.com/watch?v=tjfTxFzGh3Q" },
                    { 18, "Valorant", "Shooter", "4.99 USD", "https://www.youtube.com/watch?v=e_E9W2vsRbQ" },
                    { 19, "Half-Life: Alyx", "Shooter", "59.99 USD", "https://www.youtube.com/watch?v=O2W0N3uKXmo" },
                    { 20, "Portal 2", "Puzzle", "9.99 USD", "https://www.youtube.com/watch?v=A88YiZdXugA" },
                    { 21, "Stardew Valley", "Simulation", "14.99 USD", "https://www.youtube.com/watch?v=ot7uXNQskhs" },
                    { 22, "Terraria", "Sandbox", "9.99 USD", "https://www.youtube.com/watch?v=w7uOhFTrrq0" },
                    { 23, "The Elder Scrolls V: Skyrim", "RPG", "39.99 USD", "https://www.youtube.com/watch?v=PjqsYzBrP-M" },
                    { 24, "Left 4 Dead 2", "Shooter", "9.99 USD", "https://www.youtube.com/watch?v=9XIle_kLHKU" },
                    { 25, "Hollow Knight", "Metroidvania", "14.99 USD", "https://www.youtube.com/watch?v=UAO2urG23S4" },
                    { 26, "Fallout 4", "RPG", "29.99 USD", "https://www.youtube.com/watch?v=XW7Of3g2JME" },
                    { 27, "Rust", "Survival", "39.99 USD", "https://www.youtube.com/watch?v=LGcECozNXEw" },
                    { 28, "ARK: Survival Evolved", "Survival", "49.99 USD", "https://www.youtube.com/watch?v=FW9vsrPWujI" },
                    { 29, "Dark Souls III", "RPG", "59.99 USD", "https://www.youtube.com/watch?v=0RAlGv-IW4g" },
                    { 30, "Sekiro: Shadows Die Twice", "Action", "59.99 USD", "https://www.youtube.com/watch?v=4OgoTZXPACo" },
                    { 31, "The Legend of Zelda: Breath of the Wild", "Adventure", "59.99 USD", "https://www.youtube.com/watch?v=zw47_q9wbBE" },
                    { 32, "Uncharted 4: A Thief's End", "Adventure", "19.99 USD", "https://www.youtube.com/watch?v=hh5HV4iic1Y" },
                    { 33, "Civilization VI", "Strategy", "59.99 USD", "https://www.youtube.com/watch?v=5KdE0p2joJw" },
                    { 34, "Total War: Warhammer II", "Strategy", "59.99 USD", "https://www.youtube.com/watch?v=fXxe897bW-A" },
                    { 35, "The Witness", "Puzzle", "39.99 USD", "https://www.youtube.com/watch?v=ul7kNFD6noU" },
                    { 36, "Tetris Effect", "Puzzle", "39.99 USD", "https://www.youtube.com/watch?v=Mr8fVT_Ds4Q" },
                    { 37, "Rocket League", "Sports", "19.99 USD", "https://www.youtube.com/watch?v=SgSX3gOrj60" },
                    { 38, "Dead by Daylight", "Horror", "19.99 USD", "https://www.youtube.com/watch?v=JGhIXLO3ul8" },
                    { 39, "Cities: Skylines", "Simulation", "29.99 USD", "https://www.youtube.com/watch?v=CpWe03NhXKs" },
                    { 40, "Crusader Kings III", "Strategy", "49.99 USD", "https://www.youtube.com/watch?v=xjn66Cl3pMA" },
                    { 41, "Battlefield V", "Shooter", "39.99 USD", "https://www.youtube.com/watch?v=DJ1LfQGl0IU" },
                    { 42, "Genshin Impact", "Action RPG", "2.99 USD", "https://www.youtube.com/watch?v=HLUY1nICQRY" },
                    { 43, "League of Legends", "MOBA", "9.99 USD", "https://www.youtube.com/watch?v=IzMnCv_lPxI" },
                    { 44, "Cuphead", "Platformer", "19.99 USD", "https://www.youtube.com/watch?v=NN-9SQXoi50" },
                    { 45, "StarCraft II", "Strategy", "4.99 USD", "https://www.youtube.com/watch?v=aVtXac6if14" },
                    { 46, "Subnautica", "Survival", "24.99 USD", "https://www.youtube.com/watch?v=Rz2SNm8VguE" },
                    { 47, "World of Warcraft", "MMORPG", "49.99 USD", "https://www.youtube.com/watch?v=vlVSJ0AvZe0" },
                    { 48, "Celeste", "Platformer", "19.99 USD", "https://www.youtube.com/watch?v=70d9irlxiB4" },
                    { 49, "The Stanley Parable", "Narrative", "14.99 USD", "https://www.youtube.com/watch?v=fBtX0S2J32Y" },
                    { 50, "Persona 5 Strikers", "Action RPG", "59.99 USD", "https://www.youtube.com/watch?v=KH0-THtNjTE" }
                }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            for (int i = 1; i <= 50; i++)
            {
                migrationBuilder.DeleteData(table: "Games", keyColumn: "Id", keyValue: i);
            }
        }
    }
}