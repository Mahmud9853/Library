using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{

    public class SlideUrlResolver : IValueResolver<Slide, SlideDto, string>
    {
        private readonly IConfiguration _config;
        public SlideUrlResolver(IConfiguration config)
        {
            _config = config;
        }
        public string Resolve(Slide source, SlideDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.Photo))
            {
                return _config["ApiUrl"] + source.Photo;
            }
            return null;
        }
    }
}
