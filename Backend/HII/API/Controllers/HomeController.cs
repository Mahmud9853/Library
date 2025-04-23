using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HomeController : BaseApiController
    {
        private readonly IHomeRepository _homeRepo;
        private readonly IMapper _mapper;
        public HomeController(IHomeRepository homeRepo, IMapper mapper)
        {
            _homeRepo = homeRepo;
            _mapper = mapper;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<List<Home>>> GetAllHomes()
        {

            return await _homeRepo.GetAllHomes();   
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<HomeDto>> GetByIdHome(int id)
        {
            Home home = await _homeRepo.GetByIdTypeAsync(id);
            HomeDto data = _mapper.Map<Home, HomeDto>(home);
            return Ok(data);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public async Task<string> CreateHome([FromForm] Home home)
        {
            return await _homeRepo.AddAsync(home);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("update/{id}")]
        public async Task<string> AddHome(int id,[FromForm] Home home)
        {
            return await _homeRepo.UpdateAsync(id,home);
        }
        [HttpDelete("{id}")]
        public async Task<string> DeleteHome(int? id)
        {
            return await _homeRepo.DeleteAsync(id);
        }
        [HttpDelete("delete-photo/{id}")]
        public async Task<string> DeletePhoto(int id)
        {
            return await _homeRepo.DeletePhotoAsync(id);
        }
        [HttpGet("default-home")]
        public async Task<ActionResult<HomeDto>> GetDefaultHomeAsync()
        {
            Home home = await _homeRepo.GetDefaultHomeAsync();
            HomeDto data = _mapper.Map<Home, HomeDto>(home);
            return Ok(data);

        }


    }
}
