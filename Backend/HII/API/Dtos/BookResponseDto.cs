namespace API.Dtos
{
    public class BookResponseDto
    {
        public IEnumerable<BookDto> Books { get; set; }
        public int TotalRecords { get; set; }
    }
}
