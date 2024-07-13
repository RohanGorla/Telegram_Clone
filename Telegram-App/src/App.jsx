import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const page_response = await fetch(
        "https://devapi.beyondchats.com/api/get_all_chats?page=1"
      );
      const chat_response = await fetch(
        "https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3889"
      );
      const page_data = await page_response.json();
      const chat_data = await chat_response.json();
      setPage(page_data.data.data);
      console.log(page_data.data.data);
      setMessage(chat_data.data);
      console.log(chat_data.data);
    }
    fetchData();
  }, []);

  return (
    <div className="Telegram-main">
      <nav className="navbar">
        <div className="hamburger-button"></div>
        <div className="logo"></div>
        <div className="search-button"></div>
      </nav>
      <section className="main">
        <div className="chat-list">
          {page.map((page) => {
            return (
              <div className="list" key={page.created_at}>
                <h3>{page.creator.id}</h3>
                <h2>{page.creator.name}</h2>
              </div>
            );
          })}
        </div>
        <div className="chat-message">{}</div>
      </section>
    </div>
  );
}

export default App;
