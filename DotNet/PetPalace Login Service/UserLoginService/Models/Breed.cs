using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Breed
    {
        public Breed()
        {
            Pets = new HashSet<Pet>();
        }

        public int BreedId { get; set; }
        public string BreedName { get; set; } = null!;
        public int? PettypeId { get; set; }

        public virtual Pettype? Pettype { get; set; }
        public virtual ICollection<Pet> Pets { get; set; }
    }
}
