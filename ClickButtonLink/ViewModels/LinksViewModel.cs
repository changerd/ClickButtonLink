using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.ViewModels
{
    public class LinksViewModel
    {
        public int LinkId { get; set; }
        public string LinkName { get; set; }
        public string LinkValue { get; set; }
        public int TransitionCount { get; set; }
        public bool LinkIsActive { get; }
    }
}
