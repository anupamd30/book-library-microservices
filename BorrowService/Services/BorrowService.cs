using BorrowService.Models;
using BorrowService.Repositories;

namespace BorrowService.Services
{
    public class BorrowService : IBorrowService
    {
        private readonly IBorrowRepository _repo;
        private readonly BookServiceClient _bookClient;

        public BorrowService(IBorrowRepository repo, BookServiceClient bookClient)
        {
            _repo = repo;
            _bookClient = bookClient;
        }

        public async Task<BorrowRecord> BorrowBook(BorrowRecord record)
        {
            // 🔥 Check book from BookService
            var book = await _bookClient.GetBook(record.BookId);

            if (book == null)
                throw new Exception("Book not found");

            if (!book.IsAvailable)
                throw new Exception("Book is not available");

            // ✅ Save borrow record
            var result = await _repo.Add(record);

            // 🔥 IMPORTANT: Update BookService
            await _bookClient.UpdateAvailability(record.BookId, false);

            return result;
        }

        public async Task<List<BorrowRecord>> GetHistory()
        {
            return await _repo.GetAll();
        }

        public async Task ReturnBook(Guid id)
        {
            var records = await _repo.GetAll();
            var record = records.FirstOrDefault(x => x.Id == id);

            if (record != null)
            {
                record.ReturnDate = DateTime.UtcNow;

                await _repo.Update(record);

                // 🔥 IMPORTANT: Mark book available again
                await _bookClient.UpdateAvailability(record.BookId, true);
            }
        }
    }
}