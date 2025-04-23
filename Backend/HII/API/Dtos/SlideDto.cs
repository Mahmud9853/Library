using System.ComponentModel.DataAnnotations.Schema;

namespace API.Dtos
{
    public class SlideDto
    {
        public int Id { get; set; }
        public string Photo { get; set; }
        [NotMapped]
        public IFormFile Photos { get; set; }
    }
}
