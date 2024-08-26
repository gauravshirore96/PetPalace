using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Petclinic
    {
        public int ClinicId { get; set; }
        public string Name { get; set; } = null!;
        public int? CityId { get; set; }
        public string? Address { get; set; }
        public string? ContactNumber { get; set; }
        public string? Description { get; set; }

        public virtual City? City { get; set; }
    }
}
