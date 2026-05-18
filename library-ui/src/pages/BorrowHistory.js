import React from "react";
import api from "../api/api";

function BorrowHistory({ history, onSuccess }) {
  const returnBook = async (id) => {
    try {
      await api.post(`/gateway/borrow/return/${id}`);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card">
      <h2>📊 Borrow History</h2>

      {history.map((item) => (
        <div key={item.id}>
          <p>👤 {item.userName}</p>
          <p>📘 {item.bookId}</p>
          <p>📅 {item.borrowDate}</p>

          <button onClick={() => returnBook(item.id)}>
            Return Book
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default BorrowHistory;