using System;
using System.Collections.Generic;

namespace UserLoginService.Models
{
    public partial class Pet
    {
        public int PetId { get; set; }
        public string? Name { get; set; }
        public int? PettypeId { get; set; }
        public int? BreedId { get; set; }
        public int? Age { get; set; }
        public string? Gender { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public string? Status { get; set; }
        public int? SellerId { get; set; }
        public byte[]? Image { get; set; }

        public virtual Breed? Breed { get; set; }
        public virtual Pettype? Pettype { get; set; }
        public virtual Seller? Seller { get; set; }
    }
}
