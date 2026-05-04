using System.Net.Http.Json;

namespace BorrowService.Services
{
    public class BookServiceClient
    {
        private readonly HttpClient _httpClient;

        public BookServiceClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<BookDto?> GetBook(Guid bookId)
        {
            var response = await _httpClient.GetAsync($"http://localhost:5271/api/books/{bookId}");

            if (!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadFromJsonAsync<BookDto>();
        }

        public async Task UpdateAvailability(Guid bookId, bool isAvailable)
        {
            await _httpClient.PutAsync(
                $"http://localhost:5271/api/books/{bookId}/availability?isAvailable={isAvailable}",
                null
            );
        }
    }

    public class BookDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public bool IsAvailable { get; set; }
    }
}