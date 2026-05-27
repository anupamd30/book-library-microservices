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
            try
            {
                var result = await _service.BorrowBook(record);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.ToString());
            }
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