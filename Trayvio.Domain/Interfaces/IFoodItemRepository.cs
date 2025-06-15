using Trayvio.Domain.Entities;

namespace Trayvio.Domain.Interfaces;

public interface IFoodItemRepository : IGenericRepository<FoodItem>
{
    Task<IReadOnlyList<FoodItem>> GetFoodItemsByVendorIdAsync(int vendorId);
    // Task<IReadOnlyList<FoodItem>> GetActiveFoodItemsAsync();
    // Task<FoodItem> GetFoodItemByNameAsync(string name);
    // Task<IReadOnlyList<FoodItem>> GetFoodItemsByCategoryAsync(string category);
    // Task<IReadOnlyList<FoodItem>> GetByIdAsync(int id);
}
