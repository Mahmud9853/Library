using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Specifications
{
    public class BookParams
    {
        public string Search { get; set; }
        public int? TypeId { get; set; }
        public int? CategoryId { get; set; }
        public int? AuthorId { get; set; }
        public int? CourseId { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 15;
    }
}
