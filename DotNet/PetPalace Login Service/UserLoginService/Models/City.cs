using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class City
    {
        public City()
        {
            Petclinics = new HashSet<Petclinic>();
        }

        public int CityId { get; set; }
        public string CityName { get; set; } = null!;

        public virtual ICollection<Petclinic> Petclinics { get; set; }
    }
}
