import React, { useEffect, useState } from "react";
import BookList from "./pages/BookList";
import BorrowBook from "./pages/BorrowBook";
import BorrowHistory from "./pages/BorrowHistory";
import api from "./api/api";

function App() {
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);

  const loadData = async () => {
    try {
      // Load books from API Gateway
      const booksRes = await api.get("/gateway/books");

      // Load borrow history from API Gateway
      const historyRes = await api.get("/gateway/borrow");

      setBooks(booksRes.data);
      setHistory(historyRes.data);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>📚 Library System</h1>

      {/* Book List */}
      <BookList books={books} />

      {/* Borrow Book */}
      <BorrowBook onSuccess={loadData} />

      {/* Borrow History */}
      <BorrowHistory history={history} onSuccess={loadData} />
    </div>
  );
}

export default App;