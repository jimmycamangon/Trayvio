using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Trayvio.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddImageUrlInUserAndVendor_FixedEventLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "EventLoation",
                table: "Reservations",
                newName: "EventLocation");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Vendors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Vendors");

            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "EventLocation",
                table: "Reservations",
                newName: "EventLoation");
        }
    }
}
