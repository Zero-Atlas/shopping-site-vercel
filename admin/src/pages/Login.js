import { redirect, useActionData } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import Card from "../components/UI/Card";
import classes from "./Login.module.css";
import { baseUrl } from "../store/database";
export default function LoginPage() {
  const formError = useActionData();
  return (
    <div className={classes["login-bg"]}>
      <Card className={classes.card}>
        <h1>Sign In</h1>
        <LoginForm formError={formError} />
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

  const respon = await fetch(`${baseUrl}/admin/login`, {
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
