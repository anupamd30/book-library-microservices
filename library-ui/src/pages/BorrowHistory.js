import React from "react";
import api from "../api/api";

function BorrowHistory({ history, onSuccess }) {
  const handleReturn = async (id) => {
    await api.post(`/api/borrow/return/${id}`);
    onSuccess(); // 🔥 refresh
  };

  return (
    <div className="card">
      <h2>📊 Borrow History</h2>

      {history.map(item => (
        <div key={item.id}>
          👤 {item.userName}
          <br />
          📘 {item.bookId}
          <br />
          📅 {item.borrowDate}
          <br />
          🔁 {item.returnDate || "Not Returned"}
          <br />

          {!item.returnDate && (
            <button onClick={() => handleReturn(item.id)}>
              Return
            </button>
          )}

          <hr />
        </div>
      ))}
    </div>
  );
}

export default BorrowHistory;