using System;
using System.Collections.Generic;
using System.Text;

namespace Models
{
    public class PageProjects<T>
    {
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public int TotalPages { get; set; }
        public int CountRecords { get; set; }
        public List<T> Records { get; set; }

        public PageProjects()
        {
            Records = new List<T>();
        }

        public PageProjects(IEnumerable<T> records)
        {
            Records = new List<T>(records);
        }
    }
}
