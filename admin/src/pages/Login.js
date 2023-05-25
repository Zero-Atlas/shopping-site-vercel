import { Link, redirect, useActionData } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Card from "../components/UI/Card";
import classes from "./Login.module.css";
import { baseUrl } from "../store/database";
export default function LoginPage() {
  const formError = useActionData();
  return (
    <div className={classes["login-bg"]}>
      <Card className={classes.card}>
        <h1>Sign In</h1>
        <RegisterForm isRegister={false} formError={formError} />
        <p>
          {"Register? "}
          <Link to="/register" className={classes.mod}>
            Click
          </Link>
        </p>
      </Card>
    </div>
  );
}

export async function action({ request }) {
  const receive = await request.formData();
  const sendData = {
    email: receive.get("email"),
    password: receive.get("password"),
  };

  const respon = await fetch(`${baseUrl}/login`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sendData),
  });
  const data = await respon.json();

  if (!respon.ok) {
    return data;
  }

  console.log(data.message);

  return redirect("/");
}
