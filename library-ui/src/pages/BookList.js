import React, { useState } from "react";

import api from "../api/api";

function BookList({ books, onSuccess }) {

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [editingBookId, setEditingBookId] =
    useState(null);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    isbn: "",
    genre: "",
    isAvailable: true
  });

  // 🔥 RESET FORM
  const resetForm = () => {

    setNewBook({
      title: "",
      author: "",
      isbn: "",
      genre: "",
      isAvailable: true
    });

    setEditingBookId(null);

    setShowAddForm(false);
  };

  // 🔥 ADD BOOK
  const addBook = async () => {

    try {

      await api.post("/books", {
        ...newBook,
        createdAt: new Date().toISOString()
      });

      alert("✅ Book Added");

      resetForm();

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      console.error(err);

      alert("❌ Failed to add book");
    }
  };

  // 🔥 DELETE BOOK
  const deleteBook = async (id) => {

    try {

      await api.delete(
        `/books/${id}`
      );

      alert("✅ Book Deleted");

      if (onSuccess) {
        onSuccess();
      }

    } catch {

      alert("❌ Delete Failed");
    }
  };

  // 🔥 EDIT BOOK
  const editBook = (book) => {

    setShowAddForm(false);

    setEditingBookId(book.id);

    setNewBook({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      isAvailable: book.isAvailable
    });
  };

  // 🔥 UPDATE BOOK
  const updateBook = async () => {

    try {

      await api.put(
        `/books/${editingBookId}`,
        {
          ...newBook
        }
      );

      alert("✅ Book Updated");

      resetForm();

      if (onSuccess) {
        onSuccess();
      }

    } catch (err) {

      console.error(err);

      alert("❌ Update Failed");
    }
  };

  return (
    <div className="card">

      <h2>📘 Books</h2>

      {/* ADD BUTTON */}
      <button
        onClick={() => {

          setEditingBookId(null);

          setShowAddForm(!showAddForm);
        }}
      >
        ➕ Add Book
      </button>

      {/* ADD BOOK FORM */}
      {
        showAddForm && (

          <div className="form-box">

            <input
              placeholder="Title"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  title: e.target.value
                })
              }
            />

            <input
              placeholder="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  author: e.target.value
                })
              }
            />

            <input
              placeholder="ISBN"
              value={newBook.isbn}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  isbn: e.target.value
                })
              }
            />

            <input
              placeholder="Genre"
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  genre: e.target.value
                })
              }
            />

            <button onClick={addBook}>
              Save Book
            </button>

          </div>
        )
      }

      {/* BOOK LIST */}
      {
        books.map((book) => (

          <div
            key={book.id}
            className="book-card"
          >

            <h3>
              📘 {book.title}
            </h3>

            <p>
              ✍️ {book.author}
            </p>

            <p>
              🆔 {book.id}
            </p>

            <p>
              📚 {book.genre}
            </p>

            <p>
              🔢 {book.isbn}
            </p>

            <p>
              {
                book.isAvailable
                  ? "✅ Available"
                  : "❌ Borrowed"
              }
            </p>

            {/* ACTION BUTTONS */}
            <div className="book-actions">

              <button
                onClick={() => editBook(book)}
              >
                ✏️ Edit
              </button>

              <button
                onClick={() =>
                  deleteBook(book.id)
                }
              >
                🗑 Delete
              </button>

            </div>

            {/* INLINE EDIT FORM */}
            {
              editingBookId === book.id && (

                <div className="form-box">

                  <input
                    placeholder="Title"
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        title: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="Author"
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        author: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="ISBN"
                    value={newBook.isbn}
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        isbn: e.target.value
                      })
                    }
                  />

                  <input
                    placeholder="Genre"
                    value={newBook.genre}
                    onChange={(e) =>
                      setNewBook({
                        ...newBook,
                        genre: e.target.value
                      })
                    }
                  />

                  <button onClick={updateBook}>
                    Update Book
                  </button>

                </div>
              )
            }

          </div>
        ))
      }

    </div>
  );
}

export default BookList;