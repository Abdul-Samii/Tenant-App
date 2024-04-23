
using Tenant.Server.Models;

namespace Tenant.Server.Services
{
    public class TenantService
    {
      private readonly List<Tenant> _tenants;

      public TenantService() {
        // Initialize the list of tenants with hard-coded data
        this._tenants = new List<Tenant>
        {
          new Tenant { Id = 1, Host = "example1.com", IsActive = true, ThemeName = "Theme1" },
          new Tenant { Id = 2, Host = "example2.com", IsActive = true, ThemeName = "Theme2" }
          // Add more tenants as needed
        };
      }

      // Method to retrieve all tenants
      public IEnumerable<Tenant> GetAllTenants() {
        return _tenants;
      }

      // Method to retrieve a tenant by Id
      public Tenant GetTenantById(int id) {
        return _tenants.FirstOrDefault(t => t.Id == id);
      }
    }
}
