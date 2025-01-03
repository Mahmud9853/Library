﻿using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppUser = Core.Entities.AppUser;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;
        private readonly StoreContext _context;
        public AccountController(StoreContext context, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService, IMapper mapper, RoleManager<IdentityRole> roleManager)
        {
            _context = context;
            _mapper = mapper;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (string.IsNullOrEmpty(loginDto.UserName))
            {
                return BadRequest("Username cannot be null or empty.");
            }

            var user = await _userManager.FindByNameAsync(loginDto.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid username or password");
            }

            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);
            if (result.Succeeded)
            {
                var roles = await _userManager.GetRolesAsync(user); // Kullanıcı rolleri
                var token = _tokenService.CreateToken(user); // JWT oluşturuluyor
                return Ok(new UserDto
                {
                    UserName = user.UserName,
                    Token = token,
                    Role = roles.FirstOrDefault(), // İlk rolü alıyoruz
                    Email = user.Email 
                });
            }
            return Unauthorized("Invalid username or password");
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm] RegisterDto registerDto)
        {
            if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
            {
                return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
            }
            if (registerDto.Password != registerDto.ConfirmPassword)
            {
                return BadRequest("Password do not match!");
            }

            AppUser appUser = new AppUser
            {
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                Name = registerDto.Name,
                Surname = registerDto.Surname,
                BirthDate = registerDto.BirthDate
            };

            var identityResult = await _userManager.CreateAsync(appUser, registerDto.Password);
        
            if (!identityResult.Succeeded) return BadRequest(new ApiResponse(400));

            await _userManager.AddToRoleAsync(appUser, "Client");
            var token = _tokenService.CreateToken(appUser);

            // UserDto döndür
            //return  new UserDto
            //{
            //    UserName = appUser.UserName,
            //    Email = appUser.Email,
            //    Token = _tokenService.CreateToken(appUser),
            //};

            return Ok(new {Username = registerDto.UserName ,Toke = token});
           
        }
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByNameAsync(resetPasswordDto.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var resetResult = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);
            //var resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

            if (!resetResult.Succeeded)
            {
                return BadRequest(resetResult.Errors);
            }

            return Ok("Password reset successful.");
        }

        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
        {
            // Veritabanından kullanıcıları alın
            var users = await _context.Users.ToListAsync();

            // Her kullanıcı için async işlemleri gerçekleştirin
            var userDtos = new List<UserDto>();
            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                var userDto = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Surname = user.Surname,
                    Email = user.Email,
                    BirthDate = user.BirthDate,
                    UserName = user.UserName,
                    Role = roles.FirstOrDefault() // İlk rolü al
                };
                userDtos.Add(userDto);
            }

            return Ok(userDtos);
        }


        [HttpGet("roles")]
        public ActionResult<List<string>> GetRoles()
        {
            var roles = new List<string> { "Admin", "Client" }; // Rolleri burada belirleyin
            if (roles == null || !roles.Any())
            {
                return NotFound("No roles found.");
            }
            return Ok(roles);
        }


        [HttpPost("change-role")]
        public async Task<ActionResult> ChangeUserRole([FromForm] RoleDto changeRoleDto)
        {
            var user = await _userManager.FindByIdAsync(changeRoleDto.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Kullanıcının mevcut rollerini kaldır
            var currentRoles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, currentRoles);

            // Yeni rolleri ekle
            if (changeRoleDto.Roles != null && changeRoleDto.Roles.Any())
            {
                foreach (string role in changeRoleDto.Roles)
                {
                    if (string.IsNullOrWhiteSpace(role))
                    {
                        return BadRequest("Role cannot be null or empty.");
                    }

                    var roleExists = await _roleManager.RoleExistsAsync(role);
                    if (!roleExists)
                    {
                        return BadRequest($"Role '{role}' does not exist.");
                    }

                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return Ok(new { message = "User role updated successfully." });
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            // Kullanıcıyı bul
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(); // Kullanıcı bulunamazsa 404 döner
            }

            // Kullanıcıyı sil
            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return NoContent(); // Başarılı olursa 204 döner
            }

            return BadRequest(result.Errors); // Hata durumunda 400 döner
        }


        //[HttpPut("users/{id}")]
        //public async Task<ActionResult> UpdateUser(int id, [FromBody] RegisterDto registerDto)
        //{

        //}


        //[HttpPost("roles")]
        //public async Task CreateRolesAsync()
        //{
        //    if (!(await _roleManager.RoleExistsAsync(Helpers.AccountRole.Roles.Admin.ToString())))
        //    {
        //        await _roleManager.CreateAsync(new IdentityRole { Name = Helpers.AccountRole.Roles.Admin.ToString() });
        //    }
        //    if (!(await _roleManager.RoleExistsAsync(Helpers.AccountRole.Roles.Client.ToString())))
        //    {
        //        await _roleManager.CreateAsync(new IdentityRole { Name = Helpers.AccountRole.Roles.Client.ToString() });
        //    }
        //}
    }
}
