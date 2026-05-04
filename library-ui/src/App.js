import React, { useEffect, useState } from "react";
import BookList from "./pages/BookList";
import BorrowBook from "./pages/BorrowBook";
import BorrowHistory from "./pages/BorrowHistory";
import api from "./api/api";

function App() {
  const [books, setBooks] = useState([]);
  const [history, setHistory] = useState([]);

  const loadData = async () => {
    const booksRes = await api.get("/api/books");
    const historyRes = await api.get("/api/borrow");

    setBooks(booksRes.data);
    setHistory(historyRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      <h1>📚 Library System</h1>

      <BookList books={books} />

      <BorrowBook onSuccess={loadData} />

      <BorrowHistory history={history} onSuccess={loadData} />
    </div>
  );
}

export default App;