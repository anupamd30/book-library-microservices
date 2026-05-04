namespace BorrowService.Models
{
    public class BorrowRecord
    {
        public Guid Id { get; set; } = Guid.NewGuid();   // PK

        public Guid BookId { get; set; }                 // FK reference (no navigation)

        public string UserName { get; set; } = string.Empty;

        public DateTime BorrowDate { get; set; } = DateTime.UtcNow;

        public DateTime? ReturnDate { get; set; }        // nullable
    }
}