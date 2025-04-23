using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Helpers
{
    public class HomeUrlResolver : IValueResolver<Home, HomeDto, List<PhotoDto>>
    {
        private readonly IConfiguration _config;
        public HomeUrlResolver(IConfiguration config)
        {
            _config = config;
        }
        List<PhotoDto> IValueResolver<Home, HomeDto, List<PhotoDto>>.Resolve(Home source, HomeDto destination, List<PhotoDto> destMember, ResolutionContext context)
        {
            if (source.HomePhotos != null && source.HomePhotos.Count > 0)
            {
                return source.HomePhotos.Select(p => new PhotoDto
                {
                    Id = p.Id,
                    PhotoUrl = _config["ApiUrl"] + p.Photo
                }).ToList();

            }

            return new List<PhotoDto>();
        }
    }
}
