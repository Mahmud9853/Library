using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Entities
{
    public class HomePhotos :BaseEntity
    {
        public string Photo { get; set; }
        public int HomeId { get; set; }
        public Home Home { get; set; }
    }
}
