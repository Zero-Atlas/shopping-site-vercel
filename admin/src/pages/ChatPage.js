import { redirect, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { baseUrl } from "../store/database";
import { io } from "socket.io-client";

import classes from "./ChatPage.module.css";

//socket.io
const socket = io(baseUrl, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

export default function ChatPage() {
  const loaderData = useLoaderData();
  const [roomList, setRoomList] = useState(loaderData || []);
  const [currentRoom, setCurrentRoom] = useState(undefined);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  const getRoomHistoryHandler = async (roomId) => {
    setCurrentRoom(roomId);
    const respon = await fetch(`${baseUrl}/chat/history/${roomId}`, {
      method: "get",
      credentials: "include",
    });

    if (!respon.ok) return redirect("/error");

    const data = await respon.json();
    setHistory(data.chatHistory);
  };

  const searchFormHandler = (event) => {
    event.preventDefault();
  };
  const searchChangeHandler = (event) => {
    setSearch(event.target.value);
    setRoomList(
      loaderData.filter((room) =>
        room._id.includes(event.target.value.toLowerCase())
      )
    );
  };

  const chatFormHandler = (event) => {
    event.preventDefault();
    if (!currentRoom) {
      alert("Please enter a room!");
      return;
    }
    setHistory((prev) => [...prev, { message: message, isCustomer: false }]);
    fetch(`${baseUrl}/chat/send`, {
      method: "post",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ message: message, roomId: currentRoom }),
    }).catch((err) => {
      console.log(err);
    });

    setMessage("");
  };
  const chatChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  socket.on("chat", (socketData) => {
    if (socketData.chatRoom && socketData.chatRoom === currentRoom) {
      getRoomHistoryHandler(currentRoom); //load message when new message come
    }
  });
  return (
    <article className={classes.wrapper}>
      <div className={classes.head}>
        <h3>Chat</h3>
        <p>Apps / Chat</p>
      </div>
      <div className={classes.body}>
        <div className={classes.room}>
          <form className={classes.search} onSubmit={searchFormHandler}>
            <input
              type="text"
              name="search"
              placeholder="Search Contact"
              value={search}
              onChange={searchChangeHandler}
            />
          </form>
          <ul>
            {roomList.map((r) => {
              return (
                <li
                  className={currentRoom === r._id ? classes.active : undefined}
                  key={r._id}
                  onClick={getRoomHistoryHandler.bind(null, r._id)}
                >
                  <div className={classes.icon}>
                    <img src="assets/images/user_logo.png" alt="user" />
                  </div>{" "}
                  <p>{r._id}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={classes.chat}>
          <div className={classes["chat-content"]}>
            {history.length === 0 && <h3>Not in a chat room</h3>}
            {history.length > 0 && (
              <ul>
                {history.map((h, i) => (
                  <li
                    className={h.isCustomer ? classes.customer : classes.helper}
                    key={i}
                  >
                    {h.isCustomer && (
                      <div className={classes.icon}>
                        <img src="assets/images/user_logo.png" alt="user" />
                      </div>
                    )}
                    <p>
                      {h.isCustomer ? "Client: " : "You: "}
                      {h.message}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <form className={classes["chat-form"]} onSubmit={chatFormHandler}>
            <input
              type="text"
              name="chatMessage"
              placeholder="Type and enter"
              value={message}
              onChange={chatChangeHandler}
            />
            <button type="submit">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}

export async function loader() {
  const respon = await fetch(`${baseUrl}/chat/rooms`, {
    method: "get",
    credentials: "include",
  });
  if (!respon.ok) {
    console.log(respon);
    return redirect("error");
  }

  const data = await respon.json();
  return data;
}
