import { useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import ChatModal from "../ChatModal/ChatModal";
import Footer from "./Footer";
import MainNav from "./MainNav";
import classes from "./RootLayout.module.css";
import { baseUrl } from "../../store/database";

export default function RootLayout() {
  const [showChat, setShowChat] = useState(false);
  const clickChatHandler = () => {
    setShowChat((prev) => !prev);
  };
  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
      <button className={classes.chat} onClick={clickChatHandler}>
        <i className="fa-brands fa-facebook-messenger"></i>
      </button>
      {showChat && createPortal(<ChatModal />, document.getElementById("chat"))}
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
