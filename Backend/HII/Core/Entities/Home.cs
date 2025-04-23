using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Home : BaseEntity
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<HomePhotos> HomePhotos { get; set; }
        [NotMapped]
        public List<IFormFile> Photos { get; set; }
        //public ICollection<HomePhotos> HomePhotos { get; set; }
    }
}
