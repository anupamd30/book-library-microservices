using BorrowService.Models;

namespace BorrowService.Services
{
    public interface IBorrowService
    {
        Task<List<BorrowRecord>> GetHistory();
        Task<BorrowRecord> BorrowBook(BorrowRecord record);
        Task ReturnBook(Guid id);
    }
}