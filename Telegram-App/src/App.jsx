import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState([]);
  const [message, setMessage] = useState([]);
  const [chatId, setChatId] = useState();
  const [show, setShow] = useState(true);
  const [sidebarShow, setSidebarShow] = useState(false);
  const [mode, setMode] = useState(false);
  const [active, setActive] = useState();
  const [current, setCurrent] = useState();

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
      <nav className={mode ? "navbar nav-light" : "navbar nav-dark"}>
        <div
          className="hamburger-button"
          onClick={() => {
            setSidebarShow(!sidebarShow);
          }}
        >
          <span className="hamburger"></span>
        </div>
        <div className="logo">
          <h1 style={{ textAlign: "center", color: "white" }}>TELEGRAM</h1>
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
            <img
              style={{ width: "100%" }}
              src="https://svgsilh.com/svg/1727490.svg"
            ></img>
          </div>
          <div
            className="light-dark-button"
            onClick={() => {
              setMode(!mode);
            }}
          >
            <img
              style={{ width: "100%" }}
              src={
                mode
                  ? `https://t4.ftcdn.net/jpg/05/78/50/85/360_F_578508513_Vpl7hrU2NpSvDBzvDVi8W75zOTxHvTLI.webp`
                  : `https://static.thenounproject.com/png/4808961-200.png`
              }
            ></img>
          </div>
        </div>
        <div className="sidebar-options">
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            My Profile
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            New Group
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Contacts
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Calls
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            People Nearby
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            saved Messages
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Settings
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Invite Friends
          </p>
          <p
            style={{
              fontSize: "20px",
              margin: "1em 0",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Telegram Features
          </p>
        </div>
      </section>
      <section
        className="main"
        onClick={() => {
          setSidebarShow(false);
        }}
      >
        <div className="chat-list">
          {page.map((page, current_i) => {
            return page.data.data.map((page, index) => {
              if (page.creator.name) {
                const colors = ["red", "green", "orange", "brown", "steelblue"];
                const random = Math.floor(Math.random() * 5);
                const color = colors[random];
                console.log(color);
                return (
                  <div
                    style={{
                      margin: "10px 5px",
                      cursor: "pointer",
                    }}
                    className={show ? "list" : "d-none"}
                    key={index}
                    onClick={() => {
                      setChatId(page.id);
                      setShow(!show);
                      setActive(index);
                      setCurrent(current_i);
                    }}
                  >
                    <div
                      style={
                        index == active && current_i == current
                          ? {
                              display: "flex",
                              alignItems: "center",
                              padding: "5px",
                              backgroundColor: "silver",
                            }
                          : {
                              display: "flex",
                              alignItems: "center",
                              padding: "5px",
                            }
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          borderRadius: "50%",
                          backgroundColor: color,
                        }}
                      >
                        <h2>{page.creator.name.charAt(0).toUpperCase()}</h2>
                      </div>
                      {/* <h3>{page.creator.id}</h3> */}
                      <h2>{page.creator.name}</h2>
                    </div>
                    <div
                      style={{
                        height: "3px",
                        backgroundColor: "black",
                        marginTop: "10px",
                      }}
                    ></div>
                  </div>
                );
              }
            });
          })}
        </div>
        <div className={show ? "chat-message d-none" : "chat-message"}>
          <div
            onClick={() => {
              setShow(!show);
            }}
            className={
              show ? "chat-back-button d-none hide" : "chat-back-button hide"
            }
          >
            <img
              style={{ width: "100%" }}
              src="https://cdn.iconscout.com/icon/free/png-256/free-back-arrow-1767515-1502579.png"
            ></img>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {message.map((chat, index) => {
              return (
                <div
                  style={
                    chat.sender_id == 1
                      ? {
                          margin: "15px 5px",
                          padding: "15px 10px",
                          borderRadius: "10px",
                          backgroundColor: "rgb(20, 20, 20)",
                          color:'white',
                          maxWidth: "60%",
                          alignSelf: "end",
                        }
                      : {
                          margin: "15px 5px",
                          padding: "15px 10px",
                          borderRadius: "10px",
                          backgroundColor: "rgb(20, 20, 20)",
                          color:'white',
                          maxWidth: "60%",
                        }
                  }
                  key={index}
                >
                  {chat.sender.name ? (
                    <h2
                      style={
                        chat.sender_id == 1
                          ? { color: "orange", marginBottom: "10px" }
                          : { color: "red", marginBottom: "10px" }
                      }
                    >
                      {chat.sender.name}
                    </h2>
                  ) : (
                    <h2>Unknown User</h2>
                  )}
                  <p>{chat.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
