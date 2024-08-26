using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Sellerproduct
    {
        public int SellerproductId { get; set; }
        public int SellerId { get; set; }
        public int SupplyId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public virtual Seller Seller { get; set; } = null!;
        public virtual Petsupply Supply { get; set; } = null!;
    }
}
