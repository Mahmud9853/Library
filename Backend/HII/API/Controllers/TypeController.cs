using Type = Core.Entities.Type;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Core.Entities;
using AutoMapper;
using API.Dtos;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    public class TypeController : BaseApiController
    {
        private readonly ITypeRepository _typeRepo;
        private readonly IMapper _mapper;
        public TypeController(ITypeRepository typeRepo, IMapper mapper)
        {
            _typeRepo = typeRepo;
            _mapper = mapper;
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<TypeDto>>> GetAllType()
        {
            List<Type> types = await _typeRepo.GetAllTypeAsync();
            List<TypeDto> data = _mapper.Map<List<TypeDto>>(types);
            return Ok(data);

        }
        //[Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Type>> GetByIdType(int id)
        {
            Type type = await _typeRepo.GetByIdType(id);
            return type;
        }
        //[Authorize(Roles = "Admin")]
        [HttpPost("create")]
        public async Task<ActionResult<Type>> CreateType([FromForm] Type type)
        {
            await _typeRepo.AddAsync(type);
            return CreatedAtAction(nameof(GetAllType), new { id = type.Id }, type);
        }
        //[Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<string> DeleteType(int? id)
        {
            return await _typeRepo.DeleteAsync(id);
        }
        //[Authorize(Roles = "Admin")]
        [HttpPut("update/{id}")]
        public async Task<string> UpdateType(int? id, [FromForm] Type type)
        {
            return await _typeRepo.UpdateAsync(id, type);
        }
    }
}
