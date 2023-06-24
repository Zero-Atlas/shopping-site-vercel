
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import MainNav from "./MainNav";
import classes from "./RootLayout.module.css";
import { baseUrl } from "../../store/database";

export default function RootLayout() {  
  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <Outlet />
      </main>
      <Footer />
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
