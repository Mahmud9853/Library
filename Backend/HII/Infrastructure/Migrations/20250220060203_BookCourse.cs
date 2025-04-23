using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class BookCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CourseId",
                table: "Books",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_CourseId",
                table: "Books",
                column: "CourseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Books_Course_CourseId",
                table: "Books",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Books_Course_CourseId",
                table: "Books");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropIndex(
                name: "IX_Books_CourseId",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "CourseId",
                table: "Books");
        }
    }
}
