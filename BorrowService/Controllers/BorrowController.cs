using Microsoft.AspNetCore.Mvc;
using BorrowService.Services;
using BorrowService.Models;
using Microsoft.AspNetCore.Authorization;

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
        [Authorize]
        [HttpPost("borrow")]
        public async Task<IActionResult> Borrow(BorrowRecord record)
        {
            return Ok(await _service.BorrowBook(record));
        }

        [Authorize]
        [HttpPost("return/{id}")]
        public async Task<IActionResult> Return(Guid id)
        {
            await _service.ReturnBook(id);
            return Ok();
        }
    }
}