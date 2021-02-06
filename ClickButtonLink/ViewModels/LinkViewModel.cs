using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClickButtonLink.ViewModels
{
    public class LinkViewModel
    {
        public int LinkId { get; set; }        
        public string LinkName { get; set; }
        public string LinkDescription { get; set; }
        public string LinkValue { get; set; }
        public bool LinkIsActive { get; set; }
        public int TransitionCount { get; set; }
        public int ArrCount { get; set; }
        public List<Transition> Transitions { get; set; }
        public int UserId { get; set; }
        public string ProjectName { get; set; }
    }

    public class Transition
    {
        public DateTime TransitionDate { get; set; }
        public int TransitionCount { get; set; }
    }
}
