using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using ClickButtonLink.Helpers;
using ClickButtonLink.Helpers.VK;
using ClickButtonLink.Services.Interfaces;
using ClickButtonLink.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.IdentityModel.Tokens;
using Models;
using Newtonsoft.Json;

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
                var failresponse = new
                {
                    code = 401
                };

                return Unauthorized(failresponse);
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromDays(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                name =  identity.Claims.Where(c => c.Type == ClaimTypes.Surname).Select(c => c.Value).SingleOrDefault(),
                code = 200,
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
                    message = "Регистрация завершена",
                };
                return Ok(response);
            }
            else
            {
                var response = new
                {
                    message = "Пользователь уже существует",
                };
                return Ok(response);
            }
        }       

        [HttpGet("[action]")]
        public async Task<IActionResult> VKLogin(string code)
        {
            if (!String.IsNullOrEmpty(code))
            {
                HttpClient client = new HttpClient();
                HttpResponseMessage tokenResponse = await client.GetAsync("https://oauth.vk.com/access_token?client_id=" +
                    ClientInfo.clientId +
                    "&client_secret=" +
                    ClientInfo.clientSecret +
                    "&redirect_uri=https://localhost:" +
                    HttpContext.Connection.LocalPort +
                    "/api/Identity/VKLogin&code=" +
                    code);
                string tokenResponseString = await tokenResponse.Content.ReadAsStringAsync();
                VkTokenResponse vkTokenResponse = JsonConvert.DeserializeObject<VkTokenResponse>(tokenResponseString);

                if(String.IsNullOrEmpty(vkTokenResponse.Error))
                {
                    HttpResponseMessage userResult = await client.GetAsync(
                        "https://api.vk.com/method/users.get?access_token=" + vkTokenResponse.AccessToken + "&v=5.78");
                    string userResponse = await userResult.Content.ReadAsStringAsync();
                    VkUser vkUser = JsonConvert.DeserializeObject<VkUser>(userResponse);

                    if (vkUser != null)
                    {
                        string UserEmail = String.IsNullOrEmpty(vkTokenResponse.Email) ? "FastLink" + vkUser.Response[0].Id + "@noEmail.ru" : vkTokenResponse.Email;
                        string UserPassword = String.Format("Pass{0}word", vkUser.Response[0].Id);

                        var user = await _service.GetUser(UserEmail);

                        if(user == null)
                        {
                            var sha256 = new SHA256Managed();
                            var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(UserPassword)));
                            await _service.RegisterUser(new Models.User
                            {
                                Login = UserEmail,
                                Name = vkUser.Response[0].FirstName + " " + vkUser.Response[0].LastName,
                                Password = passwordHash
                            });

                            user = await _service.GetUser(UserEmail);
                        }

                        /*await Token(new IdentityViewModel
                        {
                            Username = user.Login,
                            Password = user.Password,
                        })*/;

                        string uri = String.Format("/?vkLogin={0}&vkPassword={1}", user.Login, new string(UserPassword.ToCharArray().Reverse().ToArray()));
                        return Redirect(uri);
                    }
                }
            }

            return Redirect("/");
        }
        
        [Route("user")]
        [HttpGet]
        public async Task<User> GetUser()
        {
            var user = await _service.GetUser(User.Identity.Name);
            user.Password = String.Empty;
            return user;
        }

        [Route("user")]
        [HttpPut]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordRequest request)
        {
            var user = await _service.GetUser(User.Identity.Name);

            if(user != null)
            {
                var sha256 = new SHA256Managed();
                var passwordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(request.OldPassword)));
                if (passwordHash == user.Password && !String.IsNullOrEmpty(request.OldPassword) && !String.IsNullOrEmpty(request.NewPassword))
                {
                    var newPasswordHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(request.NewPassword)));
                    await _service.ChangePassword(user.Login, newPasswordHash);
                    var response = new
                    {
                        code = 200,
                        message = "Пароль успешно изменен"
                    };
                    return Ok(response);
                }
                else
                {
                    var response = new
                    {
                        code = 409,
                        message = "Неверный пароль пользователя"
                    };
                    return Ok(response);
                }

            }
            else
            {
                var response = new
                {
                    code = 409,
                    message = "Пользователь не найден"
                };
                return Ok(response);
            }
            
        }
    }
}