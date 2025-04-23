using System.ComponentModel.DataAnnotations.Schema;

namespace API.Dtos
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateBook{ get; set; }
        public string BookCategory { get; set; }
        public string BookAuthor { get; set; }
        public string BookType { get; set; }
        public string BookCourse { get; set; }
        public string Photo { get; set; }
        [NotMapped]
        public IFormFile PhotoFile { get; set; }
        public string Document { get; set; }
        [NotMapped]
        public IFormFile DocumentFile { get; set; }


    }
}
