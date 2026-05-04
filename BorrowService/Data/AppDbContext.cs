using Microsoft.EntityFrameworkCore;
using BorrowService.Models;

namespace BorrowService.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<BorrowRecord> BorrowRecords { get; set; }
    }
}