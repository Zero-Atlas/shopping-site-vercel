import { useState } from "react";
import Card from "../UI/Card";
import classes from "./ChatModal.module.css";

export default function ChatModal() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messageChangeHandler = (event) => {
    setMessage(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setMessageList((prev) => [...prev, message]);
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
          {messageList.map((mes, i) => (
            <p key={i}>{mes}</p>
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
              onChange={messageChangeHandler}
              value={message}
              placeholder="Enter Message!"
            />
            <button disabled={true} className={classes.file}>
              <i className="fa-solid fa-paperclip"></i>
            </button>
            <button disabled={true} className={classes.emoji}>
              <i className="fa-solid fa-face-smile"></i>
            </button>
            <button className={classes.send}>
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </Card>
  );
}
