using Microsoft.EntityFrameworkCore;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;
using Trayvio.Infrastructure.Data;

namespace Trayvio.Infrastructure.Repositories;

public class VendorRepository : IVendorRepository
{
    private readonly ApplicationDbContext _context;

    public VendorRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Vendor?> GetByIdAsync(int id)
    {
        return await _context.Vendors.FindAsync(id);
    }

    public async Task<IReadOnlyList<Vendor>> ListAllAsync()
    {
        return await _context.Vendors.ToListAsync();
    }

    public async Task<IReadOnlyList<Vendor>> ListAllWithOwnerAsync()
    {
        return await _context.Vendors.Include(v => v.Owner).ToListAsync();
    }

    public async Task<Vendor> AddAsync(Vendor entity)
    {
        _context.Vendors.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Vendor entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Vendor entity)
    {
        _context.Vendors.Remove(entity);
        await _context.SaveChangesAsync();
    }
}
