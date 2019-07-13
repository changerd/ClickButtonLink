using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Models
{
    public class User : IdentityUser
    {
        public virtual ICollection<Project> Projects { get; set; }        
    }
}
