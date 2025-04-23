using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class CourseController : BaseApiController
    {
        private readonly ICourseRepository _courseRepo;
        private readonly IMapper _mapper;
        public CourseController(ICourseRepository courseRepo, IMapper mapper)
        {
            _courseRepo = courseRepo;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<ActionResult<List<CourseDto>>> GetAllCourse()
        {
            List<Course> courses = await _courseRepo.GetAllCourseAsync();
            List<CourseDto> data = _mapper.Map<List<CourseDto>>(courses);
            return data;
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseDto>> GetByIdCourse(int? id)
        {
            Course course = await _courseRepo.GetByIdCourseAsync(id);
            CourseDto data = _mapper.Map<Course, CourseDto>(course);
            return Ok(data);
        }

        [HttpPost("create")]
        public async Task<ActionResult<string>> CreateCourse([FromForm] Course course)
        {
            await _courseRepo.AddAsync(course);
            return CreatedAtAction(nameof(GetAllCourse), new { id = course.Id }, course);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<string>> DeleteCourse(int? id)
        {
            return await _courseRepo.DeleteAsync(id);
        }
        [HttpPut("update/{id}")]
        public async Task<string> UpdateType(int? id, [FromForm] Course course)
        {
            return await _courseRepo.UpdateAsync(id, course);
        }
    }
}
