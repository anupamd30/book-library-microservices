import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import "./App.css";

import api from "./api/api";

import Login from "./pages/Login";
import Register from "./pages/Register";

import BookList from "./pages/BookList";
import BorrowBook from "./pages/BorrowBook";
import BorrowHistory from "./pages/BorrowHistory";

function App() {

  const [books, setBooks] = useState([]);

  const [history, setHistory] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [showRegister, setShowRegister] = useState(false);

  // 🔥 Load API data
  const loadData = useCallback(async () => {

    try {

      // books
      const booksRes = await api.get("/books");

      setBooks(booksRes.data);

      // borrow history
      if (isLoggedIn) {

        const historyRes = await api.get("/borrow");

        setHistory(historyRes.data);
      }

    } catch (err) {

      console.log(err);
    }

  }, [isLoggedIn]);

  useEffect(() => {

    loadData();

  }, [loadData]);

  // 🔥 Login callback
  const handleLogin = () => {

    setIsLoggedIn(true);
  };

  // 🔥 Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    setIsLoggedIn(false);
  };

  return (
    <div className="container">

      <h1>📚 Library System</h1>

        <div className="top-bar">

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      {!isLoggedIn ? (

        showRegister ? (

          <Register
            onSwitch={() => setShowRegister(false)}
          />

        ) : (

          <Login
            onLogin={handleLogin}
            onSwitch={() => setShowRegister(true)}
          />

        )

      ) : (

        <>

       

          <BookList
            books={books}
            onSuccess={loadData}
          />

          <BorrowBook onSuccess={loadData} />

          <BorrowHistory
            history={history}
            onSuccess={loadData}
          />

        </>

      )}

    </div>
  );
}

export default App;