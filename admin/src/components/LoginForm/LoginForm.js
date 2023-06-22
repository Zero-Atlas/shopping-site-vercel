import { Form, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./LoginForm.module.css";
import useInput from "../../hook/use-input";

export default function LoginForm(props) {
  const isLoggedIn = useRouteLoaderData("root");
  const submit = useSubmit();

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

  // check for overall form
  let validForm;
  if (emailIsValid && passwordIsValid) {
    validForm = true;
  } else {
    validForm = false;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    submit(event.currentTarget, { method: "post" });
    resetPassword();
  };
  return (
    <Form onSubmit={submitHandler} className={classes.form}>
      {props.formError && (
        <p className={classes.error}>{props.formError.errorMsg}</p>
      )}
      {!isLoggedIn && passwordIsTouch && (
        <p className={classes.error}>Your email or password is incorrect!</p>
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

      <button disabled={!validForm} type="submit">
        SIGN IN
      </button>
    </Form>
  );
}
