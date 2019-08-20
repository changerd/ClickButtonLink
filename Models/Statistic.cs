using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class Statistic
    {
        public int StatisticId { get; set; }
        public DateTime StatisticDate { get; set; }
        public int LinkId { get; set; }
        //public virtual Link Link { get; set; }
    }
}
