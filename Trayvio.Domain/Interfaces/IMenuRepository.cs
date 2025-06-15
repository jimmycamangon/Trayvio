using Trayvio.Domain.Entities;

namespace Trayvio.Domain.Interfaces;

public interface IMenuRepository : IGenericRepository<Menu>
{
    Task<IReadOnlyList<Menu>> GetMenusByVendorIdAsync(int vendorId);
    // Task<Menu> GetMenuByIdAsync(int id);
    // Task<IReadOnlyList<MenuFoodItem>> GetMenuFoodItemsAsync(int menuId);
    // Task<IReadOnlyList<Menu>> GetActiveMenusAsync();
}
