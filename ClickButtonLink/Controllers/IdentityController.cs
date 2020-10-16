using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ClickButtonLink.Helpers;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace ClickButtonLink.Controllers
{
    [Route("api/[controller]")]
    public class IdentityController : Controller
    {
        IIdentityService _service;

        public IdentityController(IIdentityService service)
        {
            _service = service;
        }

        [Route("token")]
        [HttpPost]
        public async Task<IActionResult> Token([FromBody]IdentityViewModel model)
        {
            var identity = await GetIdentity(model.Username, model.Password);
            if (identity == null)
            {
                return Unauthorized();
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                name =  identity.Claims.Where(c => c.Type == ClaimTypes.Surname).Select(c => c.Value).SingleOrDefault(),
            };

            return Ok(response);
        }

        private async Task<ClaimsIdentity> GetIdentity(string userName, string password)
        {
            ClaimsIdentity identity = null;
            var user = await _service.GetUser(userName);
            if (user != null)
            {
                var sha256 = new SHA256Managed();
                var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(password)));
                if (passwordHash == user.Password)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login),
                        new Claim(ClaimTypes.Surname, user.Name),
                    };
                    identity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                }
            }
            return identity;
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody]RegisterViewModel request)
        {
            var user = await _service.GetUser(request.Username);

            if (user == null)
            {
                var sha256 = new SHA256Managed();
                var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(request.Password)));
                await _service.RegisterUser(new Models.User
                {
                    Login = request.Username,
                    Name = request.Name,
                    Password = passwordHash
                });
                var response = new
                {
                    message = "Registration completed",
                };
                return Ok(response);
            }
            else
            {
                var response = new
                {
                    message = "User already exist",
                };
                return Conflict(response);
            }
        }

    }
}