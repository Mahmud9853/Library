using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class CategoryController : BaseApiController
    {
        private readonly ICategoryRepository _categoryRepo;
        public CategoryController(ICategoryRepository categoryRepo)
        {
            _categoryRepo = categoryRepo;
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<Category>>> GetAllCategory()
        {
            List<Category> categories = await _categoryRepo.GetAllCategoryAsync();
            return categories;
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<List<Category>>> GetbyIdCategory(int? id)
        {
            Category category = await _categoryRepo.GetByIdCategoryAsync(id);
            return Ok(category);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public async Task<ActionResult<string>> CreateType([FromForm] Category category)
        {
            await _categoryRepo.AddAsync(category);
            return CreatedAtAction(nameof(GetAllCategory), new { id = category.Id }, category);
        }
        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<string> DeleteType(int? id)
        {
            return await _categoryRepo.DeleteAsync(id);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("update/{id}")]
        public async Task<string> UpdateType(int? id, [FromForm] Category category)
        {
            return await _categoryRepo.UpdateAsync(id, category);
        }
    }
}
