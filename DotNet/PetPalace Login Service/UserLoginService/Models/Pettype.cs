using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Pettype
    {
        public Pettype()
        {
            Breeds = new HashSet<Breed>();
            Pets = new HashSet<Pet>();
        }

        public int PettypeId { get; set; }
        public string TypeName { get; set; } = null!;
        public string PettypeName { get; set; } = null!;

        public virtual ICollection<Breed> Breeds { get; set; }
        public virtual ICollection<Pet> Pets { get; set; }
    }
}
