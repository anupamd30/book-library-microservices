using BorrowService.Data;
using BorrowService.Models;
using Microsoft.EntityFrameworkCore;

namespace BorrowService.Repositories
{
    public class BorrowRepository : IBorrowRepository
    {
        private readonly AppDbContext _context;

        public BorrowRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<BorrowRecord>> GetAll()
        {
            return await _context.BorrowRecords.ToListAsync();
        }

        public async Task<BorrowRecord> Add(BorrowRecord record)
        {
           
        try
        {
            _context.BorrowRecords.Add(record);

            await _context.SaveChangesAsync();

            return record;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
        }

        public async Task Update(BorrowRecord record)
        {
            try
        {
            _context.BorrowRecords.Update(record);

            await _context.SaveChangesAsync();

            return record;
        }
        catch (Exception ex)
        {
            throw new Exception(ex.ToString());
        }
        }
    }
}