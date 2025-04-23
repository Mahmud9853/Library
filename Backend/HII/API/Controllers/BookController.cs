using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Helpers;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace API.Controllers
{
    public class BookController : BaseApiController
    {
        private readonly IBookRepository _bookRepo;
        private readonly IMapper _mapper;
        public BookController(IBookRepository bookRepo, IMapper mapper)
        {
            _bookRepo = bookRepo;
            _mapper = mapper;
        }
        //[Authorize(Roles ="Admin,Client")]
        [HttpGet("query")]
        public async Task<ActionResult<IEnumerable<BookResponseDto>>> GetBookParams([FromQuery] BookParams bookParams)
        {
            (IEnumerable<Book> books, int totalRecords) = await _bookRepo.GetBooksWithFiltersAsync(bookParams);
            IEnumerable<BookDto> bookDtos = _mapper.Map<IEnumerable<BookDto>>(books);
            BookResponseDto response = new BookResponseDto
            {
                Books = bookDtos,
                TotalRecords = totalRecords

            };
            return Ok(response);
        }
        //[Authorize(Roles = "Admin,Client")]
        [Cached(600)]
        [HttpGet]
        public async Task<ActionResult<List<BookDto>>> GetAllBook()
        {
             List<Book> books= await _bookRepo.GetAllBookAsync();
            var data = _mapper.Map<List<Book>, List<BookDto>>(books);
            return Ok(data);
        }
        //[Authorize(Roles = "Admin,Client")]
        [Cached(600)]
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BookDto>> GetByIdBook(int? id)
        {
            if (id == null)
                return NotFound();
            Book book = await _bookRepo.GetByIdBookAsync(id);
            if (book == null)
                return BadRequest();
            var data = _mapper.Map<Book, BookDto>(book);
            return Ok(data);
        }
      
        [Cached(600)]
        //[Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public async Task<ActionResult<Book>> CreateBook([FromForm] Book book, [FromForm] int typeId, [FromForm] int categoryId, [FromForm] int authorId, [FromForm] int? courseId)
        {
            try
            {
                await _bookRepo.AddAsync(book, typeId, categoryId, authorId, courseId);
                return CreatedAtAction(nameof(GetAllBook), new { id = book.Id }, book);
            }
            catch (Exception ex)
            {

                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
  
        [Cached(600)]
        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<string>  DeleteBook(int? id)
        {
            return await _bookRepo.DeleteAsync(id);
        }
        [Cached(600)]
        //[Authorize(Roles = "Admin")]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<Book>> UpdateBook(int id, [FromForm] Book book, [FromForm] int typeId, [FromForm] int categoryId, [FromForm] int authorId, [FromForm] int? courseId) 
        {
            return await _bookRepo.UpdateAsync(id, book, typeId, categoryId, authorId, courseId);
        }
        [Cached(600)]
        //[Authorize(Roles = "Admin,Client")]
        [HttpGet("download/{id}")]
        public async Task<ActionResult> DownloadBook(int id)
        {
            try
            {
                var book = await _bookRepo.DownloadAsync(id);
                if (book == null)
                {
                    return NotFound(new { Message = "Book not found." });
                }

                // Dosyanın yolunu alıyoruz
                string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/documents");
                string filePath = Path.Combine(folderPath, book.Document);

                // Dosya içeriğini alıyoruz
                byte[] fileBytes = await FileHelper.DownloadFileAsync(filePath);

                // PDF olarak döndürüyoruz
                return File(fileBytes, "application/pdf", $"{book.Title}.pdf");
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }


    }
}
