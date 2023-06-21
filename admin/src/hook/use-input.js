import { useState } from "react";
function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouch, setIsTouch] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouch;

  const changeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const blurHandler = () => {
    setIsTouch(true);
  };
  const reset = () => {
    setEnteredValue("");
  };

  return {
    value: enteredValue,
    hasError,
    isValid: valueIsValid,
    changeHandler,
    blurHandler,
    setEnteredValue,
    reset,
    isTouch,
  };
}

export default useInput;
