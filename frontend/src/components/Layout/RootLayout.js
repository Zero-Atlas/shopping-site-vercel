import { useState } from "react";
import { createPortal } from "react-dom";
import { Outlet, json, useLoaderData } from "react-router-dom";
import ChatModal from "../ChatModal/ChatModal";
import Footer from "./Footer";
import MainNav from "./MainNav";
import classes from "./RootLayout.module.css";
import { baseUrl } from "../../store/database";
import { io } from "socket.io-client";

//socket.io
const socket = io(baseUrl, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd",
  },
});

export default function RootLayout() {
  const userData = useLoaderData();

  const [showChat, setShowChat] = useState(false);
  const [messageList, setMessageList] = useState([]);

  const fetchMessage = async () => {
    const respon = await fetch(`${baseUrl}/chat/history`, {
      method: "get",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!respon.ok) {
      throw json({ message: "Something went wrong!", status: 500 });
    }

    const data = await respon.json();
    setMessageList(data.chatHistory);
  };

  const clickChatHandler = () => {
    setShowChat((prev) => {
      if (!prev) {
        fetchMessage(); //load message on open modal
      }
      return !prev;
    });
  };

  // socket.io
  socket.on("chat", (socketData) => {
    if (socketData.chatRoom && socketData.chatRoom === userData.chatRoom) {
      fetchMessage(); //load message when new message come
    }
  });

  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
      {userData && (
        <button className={classes.chat} onClick={clickChatHandler}>
          <i className="fa-brands fa-facebook-messenger"></i>
        </button>
      )}
      {showChat &&
        createPortal(
          <ChatModal
            setMessageList={setMessageList}
            messageList={messageList}
          />,
          document.getElementById("chat")
        )}
    </>
  );
}

export async function loader() {
  const respon = await fetch(`${baseUrl}/check-auth`, {
    credentials: "include",
  });
  const data = await respon.json();
  // console.log(data);
  if (data.isAuthenticated === "false") {
    return false;
  }
  return data;
}
