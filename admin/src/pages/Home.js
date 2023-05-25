import { json, useLoaderData } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import Collections from "../components/Collections/Collections";
import Others from "../components/Others/Others";
import Trending from "../components/Trending/Trending";
import { baseUrl } from "../store/database";

export default function HomePage() {
  const trendingData = useLoaderData();
  return (
    <div className="container">
      <Banner />
      <Collections />
      <Trending products={trendingData} />
      <Others />
    </div>
  );
}

export async function loader() {
  // const response = await fetch(
  //   "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  // );
  const response = await fetch(`${baseUrl}/product/trending`, {
    credentials: "include",
    method: "get",
  });
  if (!response.ok) {
    throw json(
      { message: "Could not get trending product data" },
      { status: 500 }
    );
  }
  const data = await response.json();
  // console.log(data);
  return data;
}
