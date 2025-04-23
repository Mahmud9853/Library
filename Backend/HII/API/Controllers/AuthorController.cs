using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AuthorController : BaseApiController
    {
        private readonly IAuthorRepository _authorRepo;
        public AuthorController(IAuthorRepository authorRepo)
        {
            _authorRepo = authorRepo;
        }

        [HttpGet]
        public async Task<ActionResult<List<Author>>> GetAllAuthor()
        {
            List<Author> authors = await _authorRepo.GetAllAuthor();
            return authors;

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Author>> GetByIdAuthor(int id)
        {
            Author authors = await _authorRepo.GetByIdAuthor(id);
            return authors;

        }
        [HttpPost("create")]
        public async Task<ActionResult<Author>> CreateAuthor([FromForm] Author author)
        {
            await _authorRepo.AddAsync(author);
            return CreatedAtAction(nameof(GetAllAuthor), new {id = author.Id}, author);

        }
        [HttpDelete("{id}")]
        public async Task<string> DeleteAuthor(int? id)
        {
            return await _authorRepo.DeleteAsync(id);
        }
        [HttpPut("update/{id}")]
        public async Task<string> UpdateAuthor( int? id,[FromForm] Author author)
        {
            return await _authorRepo.UpdateAsync(id, author);
        }


    }
}
