using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.Services.Interfaces
{
    public interface IIdentityService
    {
        Task<User> GetUser(string username);
        Task RegisterUser(User user);
        Task ChangePassword(string username, string newPassword);
    }
}
