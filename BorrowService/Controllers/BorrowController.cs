using Microsoft.AspNetCore.Mvc;
using BorrowService.Services;
using BorrowService.Models;

namespace BorrowService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BorrowController : ControllerBase
    {
        private readonly IBorrowService _service;

        public BorrowController(IBorrowService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _service.GetHistory());
        }

        [HttpPost("borrow")]
        public async Task<IActionResult> Borrow(BorrowRecord record)
        {
            return Ok(await _service.BorrowBook(record));
        }

        [HttpPost("return/{id}")]
        public async Task<IActionResult> Return(Guid id)
        {
            await _service.ReturnBook(id);
            return Ok();
        }
    }
}