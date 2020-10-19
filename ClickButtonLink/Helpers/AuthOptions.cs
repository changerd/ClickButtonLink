using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ClickButtonLink.Helpers
{
    public class AuthOptions
    {
        public const string ISSUER = "ClickButtonLink";
        public const string AUDIENCE = "ShortLinks";
        public const string KEY = "mysupersecret_secretkey!123";
        public const int LIFETIME = 365;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
