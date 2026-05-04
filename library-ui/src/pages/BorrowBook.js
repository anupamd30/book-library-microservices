import React, { useState } from "react";
import api from "../api/api";

function BorrowBook({ onSuccess }) {
  const [bookId, setBookId] = useState("");
  const [userName, setUserName] = useState("");

  const handleBorrow = async () => {
    try {
      await api.post("/api/borrow/borrow", { bookId, userName });

      alert("✅ Book Borrowed!");

      setBookId("");
      setUserName("");

      onSuccess(); // 🔥 refresh data
    } catch {
      alert("❌ Failed");
    }
  };

  return (
    <div className="card">
      <h2>📦 Borrow Book</h2>

      <input
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />

      <input
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <br />

      <button onClick={handleBorrow}>Borrow</button>
    </div>
  );
}

export default BorrowBook;