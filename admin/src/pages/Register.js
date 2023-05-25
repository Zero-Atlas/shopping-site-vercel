import { Link, redirect, useActionData } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import Card from "../components/UI/Card";
import classes from "./Register.module.css";
import { baseUrl } from "../store/database";
export default function RegisterPage() {
  const formError = useActionData();

  return (
    <div className={classes["register-bg"]}>
      <Card className={classes.card}>
        <h1>Sign Up</h1>
        <RegisterForm isRegister={true} formError={formError} />
        <p>
          {"Login? "}
          <Link to="/login" className={classes.mod}>
            Click
          </Link>
        </p>
      </Card>
    </div>
  );
}

export async function action({ request }) {
  const receive = await request.formData();
  const userData = {
    fullName: receive.get("fullName"),
    email: receive.get("email"),
    password: receive.get("password"),
    phone: receive.get("phone"),
  };

  const respon = await fetch(`${baseUrl}/signup`, {
    method: "post",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  const data = await respon.json();

  if (!respon.ok) {
    return data;
  }

  console.log(data.message);

  return redirect("/login");
}
