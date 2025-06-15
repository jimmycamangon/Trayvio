using Microsoft.EntityFrameworkCore;
using Trayvio.Domain.Entities;
using Trayvio.Domain.Interfaces;
using Trayvio.Infrastructure.Data;

namespace Trayvio.Infrastructure.Repositories;

public class FoodItemRepository : IFoodItemRepository
{
    private readonly ApplicationDbContext _context;

    public FoodItemRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<FoodItem?> GetByIdAsync(int id)
    {
        return await _context.FoodItems.FindAsync(id);
    }

    public async Task<IReadOnlyList<FoodItem>> GetFoodItemsByVendorIdAsync(int vendorId)
    {
        return await _context.FoodItems.Where(fi => fi.VendorId == vendorId).ToListAsync();
    }

    public async Task<IReadOnlyList<FoodItem>> ListAllAsync()
    {
        return await _context.FoodItems.ToListAsync();
    }

    public async Task<FoodItem> AddAsync(FoodItem entity)
    {
        _context.FoodItems.Add(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public async Task UpdateAsync(FoodItem entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(FoodItem entity)
    {
        _context.FoodItems.Remove(entity);
        await _context.SaveChangesAsync();
    }
}
