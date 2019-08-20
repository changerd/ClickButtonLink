using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.ViewModels
{
    public class EditLinkRequest
    {
        public int LinkId { get; set; }
        public int ProjectId { get; set; }
        public string LinkName { get; set; }
        public string LinkDescription { get; set; }
        public string LinkValue { get; set; }
        public bool LinkIsActive { get; set; }
    }
}
