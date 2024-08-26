using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Orderitem
    {
        public int OrderitemId { get; set; }
        public int OrderId { get; set; }
        public int SupplyId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public virtual Order Order { get; set; } = null!;
        public virtual Petsupply Supply { get; set; } = null!;
    }
}
