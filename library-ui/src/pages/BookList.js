function BookList({ books }) {
  return (
    <div className="card">
      <h2>📘 Books</h2>

      {books.map(book => (
        <div key={book.id}>
          <b>{book.title}</b> — {book.author}
          <br />
          Status: {book.isAvailable ? "✅ Available" : "❌ Borrowed"}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default BookList;