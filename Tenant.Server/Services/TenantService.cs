
using Tenant.Server;

namespace Tenant.Server.Services
{
    public class TenantService
    {
      private readonly List<Models.Tenant> _tenants;

      public TenantService() {
        // Initialize the list of tenants with hard-coded data
        this._tenants = new List<Models.Tenant>
        {
          new Models.Tenant { Id = 1, Host = "example1.com", IsActive = true, ThemeName = "Theme1" },
          new Models.Tenant { Id = 2, Host = "example2.com", IsActive = true, ThemeName = "Theme2" }
          // Add more tenants as needed
        };
      }

      // Method to retrieve all tenants
      public IEnumerable<Models.Tenant> GetAllTenants() {
        return _tenants;
      }
    }
}
