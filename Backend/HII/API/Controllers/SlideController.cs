using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static System.Reflection.Metadata.BlobBuilder;

namespace API.Controllers
{
    public class SlideController : BaseApiController
    {
        private readonly ISlideRepository _slideRepository;
        private readonly IMapper _mapper;
        public SlideController(ISlideRepository slideRepository, IMapper mapper)
        {
            _slideRepository = slideRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<SlideDto>>> GetAll()
        {
            List<Slide> slides = await _slideRepository.GetAllSlideAsync();
            var data = _mapper.Map<List<Slide>, List<SlideDto>>(slides);
            return Ok(data);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SlideDto>> GetById(int id)
        {
            var slide = await _slideRepository.GetByIdSlideAsync(id);

            if (slide == null)
            {
                return NotFound($"Slide with ID {id} not found.");
            }

            var data = _mapper.Map<Slide, SlideDto>(slide);
            return Ok(data); // 200 OK ve SlideDto döner
        }


        [HttpPost("create")]
        public async Task<ActionResult<Slide>> Create([FromForm] Slide slide)
        {
            try
            {
                await _slideRepository.AddAsync(slide);
                return CreatedAtAction(nameof(GetById), new { id = slide.Id }, slide);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update/{id}")]
        public async Task<ActionResult<Slide>> Update(int id, [FromForm] Slide slide)
        {
            try
            {
                Slide updatedSlide = await _slideRepository.UpdateAsync(id, slide);
                return Ok(updatedSlide);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<string> Delete(int id)
        {
           return await _slideRepository.DeleteAsync(id);
        }
    }
}

