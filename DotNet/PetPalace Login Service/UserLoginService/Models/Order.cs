using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Order
    {
        public Order()
        {
            Orderitems = new HashSet<Orderitem>();
        }

        public int OrderId { get; set; }
        public int BuyerId { get; set; }
        public decimal Totalprice { get; set; }
        public DateTime? OrderDate { get; set; }
        public DateTime? OrderDate1 { get; set; }
        public decimal TotalPrice1 { get; set; }
        public int BuyerId1 { get; set; }

        public virtual Buyer Buyer { get; set; } = null!;
        public virtual Buyer BuyerId1Navigation { get; set; } = null!;
        public virtual ICollection<Orderitem> Orderitems { get; set; }
    }
}
