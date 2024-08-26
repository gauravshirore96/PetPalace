using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Buyer
    {
        public Buyer()
        {
            OrderBuyerId1Navigations = new HashSet<Order>();
            OrderBuyers = new HashSet<Order>();
        }

        public int BuyerId { get; set; }
        public int UserId { get; set; }
        public string? BuyerName { get; set; }
        public string? Address { get; set; }

        public virtual User User { get; set; } = null!;
        public virtual ICollection<Order> OrderBuyerId1Navigations { get; set; }
        public virtual ICollection<Order> OrderBuyers { get; set; }
    }
}
