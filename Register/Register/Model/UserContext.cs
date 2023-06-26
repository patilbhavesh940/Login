using Microsoft.EntityFrameworkCore;

namespace Register.Model
{
  public class UserContext: DbContext
  {
    public UserContext(DbContextOptions dbContextOptions): base(dbContextOptions) 
    {

    }

    public DbSet<User> Users { get;set; }
  }
}
