using Trayvio.Domain.Entities;

namespace Trayvio.Domain.Interfaces;

public interface IVendorRepository : IGenericRepository<Vendor>
{
    // Task<Vendor> GetVendorByNameAsync(string name);
    // Task<IReadOnlyList<Vendor>> GetVendorsByUserIdAsync(int userId);
    // Task<IReadOnlyList<Vendor>> GetActiveVendorsAsync();
    // Task<Vendor> GetVendorByIdAsync(int vendorId);
    // Task<IReadOnlyList<Vendor>> GetApprovedVendorsAsync();
    // Task<IReadOnlyList<Vendor>> GetByIdAsync(int vendorId);
    Task<IReadOnlyList<Vendor>> ListAllWithOwnerAsync();
}
