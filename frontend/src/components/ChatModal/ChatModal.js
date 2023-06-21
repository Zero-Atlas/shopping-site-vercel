import { useState } from "react";

import Card from "../UI/Card";
import { baseUrl } from "../../store/database";

import classes from "./ChatModal.module.css";

export default function ChatModal(props) {
  const [message, setMessage] = useState("");
  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    props.setMessageList((prev) => [
      ...prev,
      { message: message, isCustomer: true },
    ]);
    fetch(`${baseUrl}/chat/send`, {
      method: "post",
      credentials: "include",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ message: message }),
    }).catch((err) => {
      console.log(err);
    });

    setMessage("");
  };
  return (
    <Card className={classes.modal}>
      <div className={classes.header}>
        <div className={classes.container}>
          <h3>Customer Support</h3>
          <p>Let's Chat App</p>
        </div>
      </div>
      <div className={classes.body}>
        <div className={classes.container}>
          {props.messageList &&
            props.messageList.map((mes, i) => (
              <p
                className={mes.isCustomer ? classes.customer : classes.helper}
                key={i}
              >
                {mes.message}
              </p>
            ))}
        </div>
      </div>
      <div className={classes.footer}>
        <div className={classes.container}>
          <form onSubmit={submitHandler}>
            <label>
              <i className="fa-solid fa-user"></i>
            </label>
            <input
              type="text"
              name="chatMessage"
              onChange={messageChangeHandler}
              value={message}
              placeholder="Enter Message!"
            />
            <div
              disabled={true}
              className={
                classes.file + " " + classes.btn + " " + classes.disabled
              }
            >
              <i className="fa-solid fa-paperclip"></i>
            </div>
            <div
              disabled={true}
              className={
                classes.emoji + " " + classes.btn + " " + classes.disabled
              }
            >
              <i className="fa-solid fa-face-smile"></i>
            </div>
            <button className={classes.send + " " + classes.btn} type="submit">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
}
