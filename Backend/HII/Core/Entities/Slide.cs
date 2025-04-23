using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class Slide : BaseEntity
    {
        public string Photo { get; set; }
        [NotMapped]
        public IFormFile Photos { get; set; }
    }
}
