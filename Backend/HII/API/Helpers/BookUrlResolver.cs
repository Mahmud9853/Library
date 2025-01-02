using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class BookUrlResolver : IValueResolver<Book, BookDto, string>
    {
        private readonly IConfiguration _config;
        public BookUrlResolver(IConfiguration config) 
        {
            _config = config;
        }
        public string Resolve(Book source, BookDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Photo))
            {
                return _config["ApiUrl"] + source.Photo;
            }
            return null;
        }
    }
}
