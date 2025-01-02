using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.IdentityModel.Tokens;

namespace API.Helpers
{
    public class HomeUrlResolver : IValueResolver<Home, HomeDto, List<string>>
    {
        private readonly IConfiguration _config;
        public HomeUrlResolver(IConfiguration config)
        {
            _config = config;
        }
        List<string> IValueResolver<Home, HomeDto, List<string>>.Resolve(Home source, HomeDto destination, List<string> destMember, ResolutionContext context)
        {
            if (source.HomePhotos != null && source.HomePhotos.Count > 0)
            {
                return source.HomePhotos.Select(p => _config["ApiUrl"] + p.Photo).ToList();
            }

            return new List<string>();
        }
    }
}
