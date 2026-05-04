using Microsoft.AspNetCore.Mvc;
using BookService.Services;
using BookService.Models;

namespace BookService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _service;

        public BooksController(IBookService service)
        {
            _service = service;
        }

        // GET all books
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetBooks());
        }

        // CREATE book
        [HttpPost]
        public async Task<IActionResult> Post(Book book)
        {
            return Ok(await _service.CreateBook(book));
        }

        // DELETE book (FIXED → Guid)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _service.DeleteBook(id);
            return Ok();
        }

        // GET book by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var books = await _service.GetBooks();
            var book = books.FirstOrDefault(x => x.Id == id);

            if (book == null)
                return NotFound();

            return Ok(book);
        }

        // 🔥 NEW: Update availability
        [HttpPut("{id}/availability")]
        public async Task<IActionResult> UpdateAvailability(Guid id, [FromQuery] bool isAvailable)
        {
            var books = await _service.GetBooks();
            var book = books.FirstOrDefault(x => x.Id == id);

            if (book == null)
                return NotFound();

            book.IsAvailable = isAvailable;

            await _service.UpdateBook(book); // make sure this exists

            return Ok();
        }
    }
}