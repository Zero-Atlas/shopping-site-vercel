import { Form, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./RegisterForm.module.css";
import useInput from "../../hook/use-input";

export default function RegisterForm(props) {
  const isLoggedIn = useRouteLoaderData("root");
  const submit = useSubmit();
  const {
    value: enteredName,
    hasError: nameHasError,
    isValid: nameIsValid,
    changeHandler: nameChange,
    blurHandler: nameBlur,
  } = useInput((val) => val.trim() !== "");

  const {
    value: enteredEmail,
    hasError: emailHasError,
    isValid: emailIsValid,
    changeHandler: emailChange,
    blurHandler: emailBlur,
  } = useInput((val) => val.includes("@"));

  const {
    value: enteredPassword,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    changeHandler: passwordChange,
    blurHandler: passwordBlur,
    reset: resetPassword,
    isTouch: passwordIsTouch,
  } = useInput((val) => val.trim().length >= 5);

  const {
    value: enteredPhone,
    hasError: phoneHasError,
    isValid: phoneIsValid,
    changeHandler: phoneChange,
    blurHandler: phoneBlur,
  } = useInput((val) => val.trim() !== "");

  // check for overall form
  let validForm;
  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    phoneIsValid &&
    props.isRegister
  ) {
    validForm = true;
  } else if (emailIsValid && passwordIsValid && !props.isRegister) {
    validForm = true;
  } else {
    validForm = false;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (props.isRegister) {
      //submit normal for register
      submit(event.currentTarget, { method: "post" });
    } else {
      submit(event.currentTarget, { method: "post" });
      resetPassword();
    }
  };
  return (
    <Form onSubmit={submitHandler} className={classes.form}>
      {props.formError && (
        <p className={classes.error}>{props.formError.errorMsg}</p>
      )}
      {!props.isRegister && !isLoggedIn && passwordIsTouch && (
        <p className={classes.error}>Your email or password is incorrect!</p>
      )}
      {props.isRegister && (
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={nameChange}
          onBlur={nameBlur}
          value={enteredName}
        />
      )}
      {props.isRegister && nameHasError && (
        <p className={classes.error}>Fullname cannot be empty!</p>
      )}

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={emailChange}
        onBlur={emailBlur}
        value={enteredEmail}
      />
      {emailHasError && (
        <p className={classes.error}>Email must have '@' character!</p>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={passwordChange}
        onBlur={passwordBlur}
        value={enteredPassword}
        id="password"
      />
      {passwordHasError && (
        <p className={classes.error}>Password must be 5 or more character!</p>
      )}

      {props.isRegister && (
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={phoneChange}
          onBlur={phoneBlur}
          value={enteredPhone}
        />
      )}
      {props.isRegister && phoneHasError && (
        <p className={classes.error}>Phone cannot be empty!</p>
      )}

      <button disabled={!validForm} type="submit">
        SIGN {props.isRegister ? "UP" : "IN"}
      </button>
    </Form>
  );
}
