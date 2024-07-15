import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState([]);
  const [message, setMessage] = useState([]);
  const [chatId, setChatId] = useState();
  const [show, setShow] = useState(true);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [mode, setMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 1; i <= 10; i++) {
        const page_response = await fetch(
          `https://devapi.beyondchats.com/api/get_all_chats?page=${i}`
        );
        const page_data = await page_response.json();
        data.push(page_data);
      }
      console.log("data is ->", data);
      setPage(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (chatId) {
        const chat_response = await fetch(
          `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`
        );
        const chat_data = await chat_response.json();
        setMessage(chat_data.data);
        console.log("chat data -> ", chat_data.data);
      }
    }
    fetchData();
  }, [chatId]);

  return (
    <div className={mode ? "Telegram-main light" : "Telegram-main dark"}>
      <nav className="navbar">
        <div
          className="hamburger-button"
          onClick={() => {
            setSidebarShow(!sidebarShow);
          }}
        >
          <span className="hamburger"></span>
        </div>
        <div className="logo">
          <h1 style={{ textAlign: "center" }}>TELEGRAM</h1>
        </div>
      </nav>
      <section
        className={
          sidebarShow ? "sidebar sidebar-show" : "sidebar sidebar-hide"
        }
      >
        <div className="sidebar-button">
          <div
            className="back-button"
            onClick={() => {
              setSidebarShow(!sidebarShow);
            }}
          >
            back
          </div>
          <div
            className="light-dark-button"
            onClick={() => {
              setMode(!mode);
            }}
          >
            mode
          </div>
        </div>

        <div className="sidebar-options">
          <p style={{margin:'8px 0', textAlign:'center'}}>My Profile</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>New Group</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>Contacts</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>Calls</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>People Nearby</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>saved Messages</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>Settings</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>Invite Friends</p>
          <p style={{margin:'8px 0', textAlign:'center'}}>Telegram Features</p>
        </div>
      </section>
      <section className="main">
        <div className="chat-list">
          {page.map((page) => {
            return page.data.data.map((page, index) => {
              if (page.creator.name) {
                return (
                  <div
                    style={{ border: "white 1px solid", margin: "10px 5px", cursor:'pointer' }}
                    className={show ? "list" : "d-none"}
                    key={index}
                    onClick={() => {
                      setChatId(page.id);
                      setShow(!show);
                    }}
                  >
                    <h3>{page.creator.id}</h3>
                    <h2>{page.creator.name}</h2>
                  </div>
                );
              }
            });
          })}
        </div>
        <div className="chat-message">
          <div className="back-button">
            <button
              onClick={() => {
                setShow(!show);
              }}
              className={show ? "d-none hide" : "hide"}
            >
              back
            </button>
          </div>
          {message.map((chat, index) => {
            return (
              <div style={{ margin: "15px 5px" }} key={index}>
                {chat.sender.name ? (
                  <h2>{chat.sender.name}</h2>
                ) : (
                  <h2>Unknown User</h2>
                )}
                <p>{chat.message}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
