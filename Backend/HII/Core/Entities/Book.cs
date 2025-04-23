using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Book : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreateBook { get; set; }
        public string Photo { get; set; }
        public string Document { get; set; }
        [NotMapped]
        public IFormFile PhotoFile { get; set; }
        [NotMapped]
        public IFormFile DocumentFile{ get; set; }
        public int TypeId { get; set; }
        public Type Type { get; set; }
        public int AuthorId { get; set; }
        public Author Author { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int? CourseId { get; set; }
        public Course Course { get; set; }

    }
}
