using System.Net.Http.Json;

namespace BorrowService.Services
{
    public class BookServiceClient
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;

        public BookServiceClient(HttpClient httpClient, IConfiguration configuration)
        {
            _httpClient = httpClient;
            _configuration = configuration;
        }

        public async Task<BookDto?> GetBook(Guid bookId)
        {
            var baseUrl = _configuration["BookService:BaseUrl"];

            var response = await _httpClient.GetAsync(
                $"{baseUrl}/api/books/{bookId}"
            );

            if (!response.IsSuccessStatusCode)
                return null;

            return await response.Content.ReadFromJsonAsync<BookDto>();
        }

        public async Task UpdateAvailability(Guid bookId, bool isAvailable)
        {
            var baseUrl = _configuration["BookService:BaseUrl"];

            await _httpClient.PutAsync(
                $"{baseUrl}/api/books/{bookId}/availability?isAvailable={isAvailable}",
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