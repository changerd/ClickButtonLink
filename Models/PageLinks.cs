using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class PageLinks<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int CountLinks { get; set; }
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public List<T> Records { get; set; }

        public PageLinks()
        {
            Records = new List<T>();
        }

        public PageLinks(IEnumerable<T> records)
        {
            Records = new List<T>(records);
        }
    }
}
