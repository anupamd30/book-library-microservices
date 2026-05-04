namespace BookService.Models
{
    public class Book
    {
        public Guid Id { get; set; } = Guid.NewGuid();   // ✅ FIXED

        public string Title { get; set; } = string.Empty;
        public string Author { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public string Genre { get; set; } = string.Empty;

        public bool IsAvailable { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}