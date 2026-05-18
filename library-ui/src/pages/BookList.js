import React, { useState } from "react";
import api from "../api/api";

function BookList({ books, onSuccess }) {
  const [showForm, setShowForm] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: ""
  });

  const addBook = async () => {
    try {
      await api.post("/gateway/books", {
        ...newBook,
        isAvailable: true,
        createdAt: new Date().toISOString()
      });

      setNewBook({
        title: "",
        author: "",
        isbn: "",
        genre: ""
      });

      setShowForm(false);

      onSuccess();
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="card">
      <h2>📘 Books</h2>

      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: "15px",
          padding: "10px 15px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#4f46e5",
          color: "white",
          cursor: "pointer"
        }}
      >
        ➕ Add Book
      </button>

      {showForm && (
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}
        >
          <input
            placeholder="Title"
            value={newBook.title}
            onChange={(e) =>
              setNewBook({ ...newBook, title: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Author"
            value={newBook.author}
            onChange={(e) =>
              setNewBook({ ...newBook, author: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="ISBN"
            value={newBook.isbn}
            onChange={(e) =>
              setNewBook({ ...newBook, isbn: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) =>
              setNewBook({ ...newBook, genre: e.target.value })
            }
            style={inputStyle}
          />

          <button
            onClick={addBook}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#16a34a",
              color: "white",
              cursor: "pointer"
            }}
          >
            Save Book
          </button>
        </div>
      )}

      <hr />

      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        books.map((book) => (
          <div
            key={book.id}
            style={{
              border: "1px solid #444",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
              backgroundColor: "#1e293b",
              color: "white"
            }}
          >
            <p>
              <strong>📘 Title:</strong> {book.title}
            </p>

            <p>
              <strong>✍ Author:</strong> {book.author}
            </p>

            <p>
              <strong>🆔 Book ID:</strong> {book.id}
            </p>

            <p>
              <strong>📚 Genre:</strong> {book.genre}
            </p>

            <p>
              <strong>📖 ISBN:</strong> {book.isbn}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {book.isAvailable
                ? "✅ Available"
                : "❌ Borrowed"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #555",
  backgroundColor: "#0f172a",
  color: "white"
};

export default BookList;