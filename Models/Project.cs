using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        //public string UserId { get; set; }
        //public User User { get; set; }
        public virtual ICollection<Link> Links { get; set; }
    }
}
