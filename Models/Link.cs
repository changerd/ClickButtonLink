using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Link
    {
        public int LinkId { get; set; }
        public string LinkName { get; set; }
        public string LinkDescription { get; set; }
        public string LinkValue { get; set; }
        public bool LinkIsActive { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public virtual ICollection<Statistic> Statistics { get; set; }
    }
}
