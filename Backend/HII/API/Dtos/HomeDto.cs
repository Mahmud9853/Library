namespace API.Dtos
{
    public class HomeDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public List<PhotoDto> Photos { get; set; }
    }
}
