using Microsoft.EntityFrameworkCore;
using Trayvio.Domain.Entities;

namespace Trayvio.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<FoodItem> FoodItems { get; set; } = null!;
    public DbSet<Vendor> Vendors { get; set; } = null!;
    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Menu> Menus { get; set; } = null!;
    public DbSet<MenuFoodItem> MenuFoodItems { get; set; } = null!;
    public DbSet<Reservation> Reservations { get; set; } = null!;
    public DbSet<ReservationMenu> ReservationMenus { get; set; } = null!;
    public DbSet<Payment> Payments { get; set; } = null!;
    public DbSet<VendorStaff> VendorStaffs { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);

        //MENU-FOODITEM MANY TO MANY RELATIONSHIP
        modelBuilder.Entity<MenuFoodItem>().HasKey(mf => new { mf.MenuId, mf.FoodItemId });
        modelBuilder
            .Entity<MenuFoodItem>()
            .HasOne(mf => mf.Menu)
            .WithMany(m => m.MenuFoodItems)
            .HasForeignKey(mf => mf.MenuId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder
            .Entity<MenuFoodItem>()
            .HasOne(mf => mf.FoodItem)
            .WithMany(f => f.MenuFoodItems)
            .HasForeignKey(mf => mf.FoodItemId)
            .OnDelete(DeleteBehavior.Cascade);

        //RESERVATION-MENU MANY TO MANY RELATIONSHIP
        modelBuilder.Entity<ReservationMenu>().HasKey(rm => new { rm.ReservationId, rm.MenuId });
        modelBuilder
            .Entity<ReservationMenu>()
            .HasOne(rm => rm.Reservation)
            .WithMany(r => r.ReservationMenus)
            .HasForeignKey(rm => rm.ReservationId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder
            .Entity<ReservationMenu>()
            .HasOne(rm => rm.Menu)
            .WithMany(m => m.ReservationMenus)
            .HasForeignKey(rm => rm.MenuId)
            .OnDelete(DeleteBehavior.Cascade);

        //REVIEW ONE TO ONE RELATIONSHIP
        modelBuilder
            .Entity<Review>()
            .HasOne(r => r.Reservation)
            .WithOne(r => r.Review)
            .HasForeignKey<Review>(r => r.ReservationId)
            .OnDelete(DeleteBehavior.Cascade);

        // PAYMENT ONE TO ONE RELATIONSHIP
        modelBuilder
            .Entity<Payment>()
            .HasOne(p => p.Reservation)
            .WithOne(r => r.Payment)
            .HasForeignKey<Payment>(p => p.ReservationId)
            .OnDelete(DeleteBehavior.Cascade);

        // VENDOR STAFF MANY TO MANY RELATIONSHIP
        modelBuilder.Entity<VendorStaff>().HasKey(vs => new { vs.VendorId, vs.StaffUserId });
        modelBuilder
            .Entity<VendorStaff>()
            .HasOne(vs => vs.Vendor)
            .WithMany(v => v.VendorStaffs)
            .HasForeignKey(vs => vs.VendorId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder
            .Entity<VendorStaff>()
            .HasOne(vs => vs.StaffUser)
            .WithMany(u => u.VendorStaffs)
            .HasForeignKey(vs => vs.StaffUserId)
            .OnDelete(DeleteBehavior.Restrict);

        // FOOD ITEM ONE TO ONE RELATIONSHIP
        modelBuilder
            .Entity<FoodItem>()
            .HasOne(f => f.Vendor)
            .WithMany(v => v.FoodItems)
            .HasForeignKey(f => f.VendorId)
            .OnDelete(DeleteBehavior.Restrict);

        // MENU ONE TO ONE RELATIONSHIP
        modelBuilder
            .Entity<Menu>()
            .HasOne(m => m.Vendor)
            .WithMany(v => v.Menus)
            .HasForeignKey(m => m.VendorId)
            .OnDelete(DeleteBehavior.Restrict);

        // RESERVATION ONE TO MANY RELATIONSHIP
        modelBuilder
            .Entity<Reservation>()
            .HasOne(r => r.Vendor)
            .WithMany(v => v.Reservations)
            .HasForeignKey(r => r.VendorId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder
            .Entity<Reservation>()
            .HasOne(r => r.Customer)
            .WithMany(u => u.Reservations)
            .HasForeignKey(r => r.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        // VENDOR ONE TO MANY RELATIONSHIP
        modelBuilder
            .Entity<Vendor>()
            .HasMany(v => v.FoodItems)
            .WithOne(f => f.Vendor)
            .HasForeignKey(f => f.VendorId)
            .OnDelete(DeleteBehavior.Restrict);

        // CUSTOMER PROFILE ONE TO ONE RELATIONSHIP
        modelBuilder
            .Entity<User>()
            .HasOne(u => u.CustomerProfile)
            .WithOne(cp => cp.User)
            .HasForeignKey<CustomerProfile>(cp => cp.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // USER ONE TO MANY RELATIONSHIP
        modelBuilder
            .Entity<User>()
            .HasMany(u => u.VendorStaffs)
            .WithOne(vs => vs.StaffUser)
            .HasForeignKey(vs => vs.StaffUserId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder
            .Entity<User>()
            .HasMany(u => u.Reservations)
            .WithOne(r => r.Customer)
            .HasForeignKey(r => r.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);
        modelBuilder
            .Entity<User>()
            .HasMany(u => u.Vendors)
            .WithOne(v => v.Owner)
            .HasForeignKey(v => v.OwnerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure decimal precision for monetary values

        modelBuilder.Entity<FoodItem>().Property(f => f.Price).HasPrecision(18, 2);

        modelBuilder.Entity<Menu>().Property(m => m.Price).HasPrecision(18, 2);

        modelBuilder.Entity<Payment>().Property(p => p.Amount).HasPrecision(18, 2);

        modelBuilder.Entity<Payment>().Property(p => p.PlatformFee).HasPrecision(18, 2);

        modelBuilder.Entity<Vendor>().Property(v => v.CommissionRate).HasPrecision(18, 2);
    }
}
