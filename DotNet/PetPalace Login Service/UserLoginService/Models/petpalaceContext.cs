using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace UserLoginService.Models
{
    public partial class petpalaceContext : DbContext
    {
        public petpalaceContext()
        {
        }

        public petpalaceContext(DbContextOptions<petpalaceContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Breed> Breeds { get; set; } = null!;
        public virtual DbSet<Buyer> Buyers { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<Orderitem> Orderitems { get; set; } = null!;
        public virtual DbSet<Pet> Pets { get; set; } = null!;
        public virtual DbSet<Petclinic> Petclinics { get; set; } = null!;
        public virtual DbSet<Petsupply> Petsupplies { get; set; } = null!;
        public virtual DbSet<Pettype> Pettypes { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Seller> Sellers { get; set; } = null!;
        public virtual DbSet<Sellerproduct> Sellerproducts { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=petpalace", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Breed>(entity =>
            {
                entity.ToTable("breeds");

                entity.HasIndex(e => e.BreedName, "BreedName")
                    .IsUnique();

                entity.HasIndex(e => e.PettypeId, "breeds_ibfk_1");

                entity.Property(e => e.BreedId).HasColumnName("breed_id");

                entity.Property(e => e.BreedName).HasColumnName("breed_name");

                entity.Property(e => e.PettypeId).HasColumnName("pettype_id");

                entity.HasOne(d => d.Pettype)
                    .WithMany(p => p.Breeds)
                    .HasForeignKey(d => d.PettypeId)
                    .HasConstraintName("breeds_ibfk_1");
            });

            modelBuilder.Entity<Buyer>(entity =>
            {
                entity.ToTable("buyer");

                entity.HasIndex(e => e.UserId, "buyer_ibfk_1");

                entity.Property(e => e.BuyerId).HasColumnName("buyer_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.BuyerName)
                    .HasMaxLength(255)
                    .HasColumnName("buyer_name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Buyers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("buyer_ibfk_1");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("categories");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.CategoryName)
                    .HasMaxLength(255)
                    .HasColumnName("category_name");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("cities");

                entity.Property(e => e.CityId).HasColumnName("city_id");

                entity.Property(e => e.CityName)
                    .HasMaxLength(255)
                    .HasColumnName("city_name");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.HasIndex(e => e.BuyerId, "BuyerID");

                entity.HasIndex(e => e.BuyerId1, "FK8bfdq6yuliu59tbo7go78xt51");

                entity.Property(e => e.OrderId).HasColumnName("OrderID");

                entity.Property(e => e.BuyerId).HasColumnName("BuyerID");

                entity.Property(e => e.BuyerId1).HasColumnName("buyer_id");

                entity.Property(e => e.OrderDate)
                    .HasColumnType("timestamp")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.OrderDate1)
                    .HasMaxLength(6)
                    .HasColumnName("order_date");

                entity.Property(e => e.TotalPrice1)
                    .HasPrecision(38, 2)
                    .HasColumnName("total_price");

                entity.Property(e => e.Totalprice)
                    .HasPrecision(38, 2)
                    .HasColumnName("totalprice");

                entity.HasOne(d => d.Buyer)
                    .WithMany(p => p.OrderBuyers)
                    .HasForeignKey(d => d.BuyerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orders_ibfk_1");

                entity.HasOne(d => d.BuyerId1Navigation)
                    .WithMany(p => p.OrderBuyerId1Navigations)
                    .HasForeignKey(d => d.BuyerId1)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK8bfdq6yuliu59tbo7go78xt51");
            });

            modelBuilder.Entity<Orderitem>(entity =>
            {
                entity.ToTable("orderitems");

                entity.HasIndex(e => e.OrderId, "orderitems_ibfk_1");

                entity.HasIndex(e => e.SupplyId, "orderitems_ibfk_2");

                entity.Property(e => e.OrderitemId).HasColumnName("orderitem_id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.Price)
                    .HasPrecision(10, 2)
                    .HasColumnName("price");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SupplyId).HasColumnName("supply_id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Orderitems)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orderitems_ibfk_1");

                entity.HasOne(d => d.Supply)
                    .WithMany(p => p.Orderitems)
                    .HasForeignKey(d => d.SupplyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("orderitems_ibfk_2");
            });

            modelBuilder.Entity<Pet>(entity =>
            {
                entity.ToTable("pets");

                entity.HasIndex(e => e.PettypeId, "pets_ibfk_1");

                entity.HasIndex(e => e.BreedId, "pets_ibfk_2");

                entity.HasIndex(e => e.SellerId, "pets_ibfk_3");

                entity.Property(e => e.PetId).HasColumnName("pet_id");

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.BreedId).HasColumnName("breed_id");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Gender).HasColumnType("enum('Male','Female')");

                entity.Property(e => e.Image)
                    .HasColumnType("tinyblob")
                    .HasColumnName("image");

                entity.Property(e => e.Name)
                    .HasMaxLength(255)
                    .HasColumnName("name");

                entity.Property(e => e.PettypeId).HasColumnName("pettype_id");

                entity.Property(e => e.Price)
                    .HasPrecision(38, 2)
                    .HasColumnName("price");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.Status)
                    .HasColumnType("enum('Available','Adopted')")
                    .HasColumnName("status")
                    .HasDefaultValueSql("'Available'");

                entity.HasOne(d => d.Breed)
                    .WithMany(p => p.Pets)
                    .HasForeignKey(d => d.BreedId)
                    .HasConstraintName("pets_ibfk_2");

                entity.HasOne(d => d.Pettype)
                    .WithMany(p => p.Pets)
                    .HasForeignKey(d => d.PettypeId)
                    .HasConstraintName("pets_ibfk_1");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Pets)
                    .HasForeignKey(d => d.SellerId)
                    .HasConstraintName("pets_ibfk_3");
            });

            modelBuilder.Entity<Petclinic>(entity =>
            {
                entity.HasKey(e => e.ClinicId)
                    .HasName("PRIMARY");

                entity.ToTable("petclinics");

                entity.HasIndex(e => e.CityId, "CityID");

                entity.Property(e => e.ClinicId).HasColumnName("ClinicID");

                entity.Property(e => e.Address).HasColumnType("text");

                entity.Property(e => e.CityId).HasColumnName("CityID");

                entity.Property(e => e.ContactNumber).HasMaxLength(15);

                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.Name).HasMaxLength(100);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Petclinics)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("petclinics_ibfk_1");
            });

            modelBuilder.Entity<Petsupply>(entity =>
            {
                entity.HasKey(e => e.SupplyId)
                    .HasName("PRIMARY");

                entity.ToTable("petsupplies");

                entity.HasIndex(e => e.CategoryId, "petsupplies_ibfk_1");

                entity.Property(e => e.SupplyId).HasColumnName("supply_id");

                entity.Property(e => e.CategoryId).HasColumnName("category_id");

                entity.Property(e => e.Description)
                    .HasColumnType("text")
                    .HasColumnName("description");

                entity.Property(e => e.Image)
                    .HasColumnType("blob")
                    .HasColumnName("image");

                entity.Property(e => e.Price)
                    .HasPrecision(10, 2)
                    .HasColumnName("price");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SupplyName)
                    .HasMaxLength(100)
                    .HasColumnName("supply_name");

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Petsupplies)
                    .HasForeignKey(d => d.CategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("petsupplies_ibfk_1");
            });

            modelBuilder.Entity<Pettype>(entity =>
            {
                entity.ToTable("pettypes");

                entity.HasIndex(e => e.TypeName, "TypeName")
                    .IsUnique();

                entity.HasIndex(e => e.PettypeName, "UKoer7jhn9lnho6nja7me978okw")
                    .IsUnique();

                entity.Property(e => e.PettypeId).HasColumnName("pettype_id");

                entity.Property(e => e.PettypeName).HasColumnName("pettype_name");

                entity.Property(e => e.TypeName)
                    .HasMaxLength(50)
                    .HasColumnName("type_name");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("roles");

                entity.HasIndex(e => e.RoleName, "RoleName")
                    .IsUnique();

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName).HasColumnName("role_name");
            });

            modelBuilder.Entity<Seller>(entity =>
            {
                entity.ToTable("seller");

                entity.HasIndex(e => e.UserId, "FK614u1eblpnxmrxd25efo29qhr");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.SellerName)
                    .HasMaxLength(255)
                    .HasColumnName("seller_name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Sellers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK614u1eblpnxmrxd25efo29qhr");
            });

            modelBuilder.Entity<Sellerproduct>(entity =>
            {
                entity.ToTable("sellerproducts");

                entity.HasIndex(e => e.SellerId, "sellerproducts_ibfk_1");

                entity.HasIndex(e => e.SupplyId, "sellerproducts_ibfk_2");

                entity.Property(e => e.SellerproductId).HasColumnName("sellerproduct_id");

                entity.Property(e => e.Price)
                    .HasPrecision(10, 2)
                    .HasColumnName("price");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.SupplyId).HasColumnName("supply_id");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.Sellerproducts)
                    .HasForeignKey(d => d.SellerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("sellerproducts_ibfk_1");

                entity.HasOne(d => d.Supply)
                    .WithMany(p => p.Sellerproducts)
                    .HasForeignKey(d => d.SupplyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("sellerproducts_ibfk_2");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.Email, "Email")
                    .IsUnique();

                entity.HasIndex(e => e.RoleId, "RoleID");

                entity.HasIndex(e => e.Username, "Username")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.AadharNumber)
                    .HasMaxLength(255)
                    .HasColumnName("aadharnumber");

                entity.Property(e => e.Address)
                    .HasMaxLength(255)
                    .HasColumnName("address");

                entity.Property(e => e.Contact)
                    .HasMaxLength(255)
                    .HasColumnName("contact");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("timestamp")
                    .HasColumnName("createdat")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Email).HasColumnName("email");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .HasColumnName("first_name");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .HasColumnName("last_name");

                entity.Property(e => e.PasswordHash)
                    .HasMaxLength(255)
                    .HasColumnName("passwordhash");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.Status)
                    .HasColumnType("bit(1)")
                    .HasColumnName("status");

                entity.Property(e => e.UpdatedAt)
                    .HasColumnType("timestamp")
                    .ValueGeneratedOnAddOrUpdate()
                    .HasColumnName("updatedat")
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(e => e.Username).HasColumnName("user_name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
