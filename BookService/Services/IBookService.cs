using BookService.Models;

namespace BookService.Services
{
    public interface IBookService
    {
        Task<List<Book>> GetBooks();
        Task<Book> CreateBook(Book book);
        Task DeleteBook(Guid id);
        Task UpdateBook(Book book);
    }
}