using BookService.Models;

namespace BookService.Repositories
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAll();
        Task<Book> Add(Book book);
        Task Delete(Guid id);
        Task Update(Book book);
    }
}