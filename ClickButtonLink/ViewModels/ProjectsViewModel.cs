using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.ViewModels
{
    public class ProjectsViewModel
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public int TransitionCount { get; set; }
        public int LinkCount { get; set; }
    }
}
