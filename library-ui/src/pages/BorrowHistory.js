import React from "react";
import api from "../api/api";

function BorrowHistory({ history, onSuccess }) {

  const handleReturn = async (id) => {

    try {

      await api.post(`/gateway/borrow/return/${id}`);

      alert("✅ Book Returned");

      onSuccess();

    } catch {

      alert("❌ Return Failed");
    }
  };

  return (
    <div className="card">

      <h2>📚 Borrow History</h2>

      {
        history.map((item) => (

          <div key={item.id} className="history-item">

            <p>
              👤 {item.userName}
            </p>

            <p>
              📘 {item.bookId}
            </p>

            <p>
              📅 {item.borrowDate}
            </p>

            <p>
              {
                item.returnDate
                  ? "✅ Returned"
                  : "❌ Not Returned"
              }
            </p>

            {
              !item.returnDate && (

                <button
                  onClick={() => handleReturn(item.id)}
                >
                  Return
                </button>
              )
            }

          </div>
        ))
      }

    </div>
  );
}

export default BorrowHistory;