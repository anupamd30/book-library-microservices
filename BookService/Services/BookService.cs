using BookService.Models;
using BookService.Repositories;

namespace BookService.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _repo;

        public BookService(IBookRepository repo)
        {
            _repo = repo;
        }

        public async Task<List<Book>> GetBooks()
        {
            return await _repo.GetAll();
        }

        public async Task<Book> CreateBook(Book book)
        {
            return await _repo.Add(book);
        }

        // 🔥 FIX: int → Guid
        public async Task DeleteBook(Guid id)
        {
            await _repo.Delete(id);
        }

        // 🔥 FIX: use repository instead of _context
        public async Task UpdateBook(Book book)
        {
            await _repo.Update(book);
        }
    }
}