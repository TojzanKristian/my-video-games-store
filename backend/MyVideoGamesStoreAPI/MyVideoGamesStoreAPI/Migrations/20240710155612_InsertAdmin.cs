using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyVideoGamesStoreAPI.Migrations
{
    /// <inheritdoc />
    public partial class InsertAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "FirstName", "LastName", "UserName", "Email", "Password", "DateOfBirth", "Country", "PhoneNumber" },
                values: new object[] { 1, "Kristian", "Tojzan", "TKStoreAdmin", "kristiantojzan@gmail.com", "8d9191a6a98ecc2154b73c041a74f6d5834c47973f9a0a68074454ccafbaf035", "2000-02-06", "Serbia", "0628868123" }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(table: "Users", keyColumn: "Id", keyValue: 1);
        }
    }
}