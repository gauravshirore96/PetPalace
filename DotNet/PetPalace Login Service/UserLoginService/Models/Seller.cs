using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Seller
    {
        public Seller()
        {
            Pets = new HashSet<Pet>();
            Sellerproducts = new HashSet<Sellerproduct>();
        }

        public int SellerId { get; set; }
        public int UserId { get; set; }
        public string? SellerName { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Pet> Pets { get; set; }
        public virtual ICollection<Sellerproduct> Sellerproducts { get; set; }
    }
}
