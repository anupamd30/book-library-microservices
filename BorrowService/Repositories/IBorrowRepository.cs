using BorrowService.Models;

namespace BorrowService.Repositories
{
    public interface IBorrowRepository
    {
        Task<List<BorrowRecord>> GetAll();
        Task<BorrowRecord> Add(BorrowRecord record);
        Task Update(BorrowRecord record);
    }
}