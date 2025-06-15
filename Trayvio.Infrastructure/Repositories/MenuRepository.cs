using Microsoft.EntityFrameworkCore;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;
using Trayvio.Infrastructure.Data;

namespace Trayvio.Infrastructure.Repositories;

public class MenuRepository : IMenuRepository
{
    private readonly ApplicationDbContext _context;

    public MenuRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Menu?> GetByIdAsync(int id)
    {
        return await _context.Menus.FindAsync(id);
    }

    public async Task<IReadOnlyList<Menu>> GetMenusByVendorIdAsync(int vendorId)
    {
        return await _context.Menus.Where(m => m.VendorId == vendorId).ToListAsync();
    }

    public async Task<IReadOnlyList<Menu>> ListAllAsync()
    {
        return await _context.Menus.ToListAsync();
    }

    public async Task<Menu> AddAsync(Menu entity)
    {
        _context.Menus.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(Menu entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Menu entity)
    {
        _context.Menus.Remove(entity);
        await _context.SaveChangesAsync();
    }
}
