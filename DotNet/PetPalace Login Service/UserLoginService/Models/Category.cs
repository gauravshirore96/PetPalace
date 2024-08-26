using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Category
    {
        public Category()
        {
            Petsupplies = new HashSet<Petsupply>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = null!;

        public virtual ICollection<Petsupply> Petsupplies { get; set; }
    }
}
