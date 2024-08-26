using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Petsupply
    {
        public Petsupply()
        {
            Orderitems = new HashSet<Orderitem>();
            Sellerproducts = new HashSet<Sellerproduct>();
        }

        public int SupplyId { get; set; }
        public string SupplyName { get; set; } = null!;
        public int CategoryId { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public byte[]? Image { get; set; }

        public virtual Category Category { get; set; } = null!;
        public virtual ICollection<Orderitem> Orderitems { get; set; }
        public virtual ICollection<Sellerproduct> Sellerproducts { get; set; }
    }
}
