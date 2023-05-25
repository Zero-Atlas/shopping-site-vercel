import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import classes from "./SearchForm.module.css";
export default function SearchForm() {
  const [, setSearchParams] = useSearchParams();
  const [enteredInput, setEnteredInput] = useState("");

  const inputChangeHandler = (event) => {
    setSearchParams((prev) => {
      prev.set("q", event.target.value);
      return prev;
    });
    setEnteredInput(event.target.value);
  };

  const sortChangeHandler = (event) => {
    setSearchParams((prev) => {
      prev.set("sort", event.target.value);
      return prev;
    });
  };
  const submitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input
        type="text"
        onChange={inputChangeHandler}
        value={enteredInput}
        placeholder="Enter search here!"
      />
      <select onChange={sortChangeHandler}>
        <option value="default">Default sorting</option>
        <option value="asc-price">Ascending price</option>
        <option value="desc-price">Descending price</option>
      </select>
    </form>
  );
}
