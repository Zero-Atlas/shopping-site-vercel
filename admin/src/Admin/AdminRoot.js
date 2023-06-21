import { Outlet, json, useLoaderData, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader/PageHeader";
import { useEffect } from "react";
import { baseUrl } from "../store/database";

export default function AdminRoot() {
  const checkLevel = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    if (checkLevel) {
      if (checkLevel.level !== 2) {
        alert(checkLevel.message);
        navigate("/");
      }
    } else {
      navigate("/");
    }
  }, [checkLevel, navigate]);
  return (
    <div className="container">
      <PageHeader page="ADMIN" />
      <Outlet />
    </div>
  );
}

export async function loader() {
  const respon = await fetch(`${baseUrl}/admin/check-level`, {
    credentials: "include",
  });

  if (respon.status === 401) {
    return {
      level: 0,
      message: "No admin account is logged in, please use a valid account!",
    };
  }

  if (!respon.ok) {
    throw json({ message: "Could not get product data" }, { status: 500 });
  }
  const data = await respon.json();
  return data;
}
