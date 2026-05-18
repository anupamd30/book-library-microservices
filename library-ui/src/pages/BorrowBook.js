import React, { useState } from "react";
import api from "../api/api";

function BorrowBook({ onSuccess }) {
  const [bookId, setBookId] = useState("");
  const [userName, setUserName] = useState("");

  const handleBorrow = async () => {
    try {
      await api.post("/gateway/borrow/borrow", {
        bookId,
        userName
      });

      alert("✅ Book Borrowed!");

      setBookId("");
      setUserName("");

      onSuccess();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to borrow book");
    }
  };

  return (
    <div className="card">
      <h2>📦 Borrow Book</h2>

      <input
        type="text"
        placeholder="Book ID"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
      />

      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleBorrow}>
        Borrow
      </button>
    </div>
  );
}

export default BorrowBook;