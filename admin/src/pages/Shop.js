import PageHeader from "../components/ShopHeader/PageHeader";
import { json, useLoaderData, useSearchParams } from "react-router-dom";
import ShopResult from "../components/ShopResult/ShopResult";
import ShopSidebar from "../components/ShopSidebar/ShopSidebar";
import classes from "./Shop.module.css";
import { baseUrl } from "../store/database";

export default function ShopPage() {
  const productList = useLoaderData();
  const [searchParams] = useSearchParams();

  let filteredList = productList;

  // if has 'cat', category will be filter by 'cat'
  if (searchParams.get("cat")) {
    filteredList = productList.filter(
      (product) => product.category === searchParams.get("cat")
    );
  }
  // if has 'q', category will be filter by 'q'
  if (searchParams.get("q")) {
    filteredList = productList.filter((product) =>
      product.name.includes(searchParams.get("q"))
    );
  }
  // if has 'sort', list will be sort by price
  if (searchParams.get("sort")) {
    switch (searchParams.get("sort")) {
      case "asc-price":
        filteredList = filteredList.sort((a, b) => a.price - b.price);
        break;
      case "desc-price":
        filteredList = filteredList.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
  }
  return (
    <div className="container">
      <PageHeader page="SHOP" />
      <section className={classes.content}>
        <ShopSidebar />
        <ShopResult data={filteredList} />
      </section>
    </div>
  );
}

export async function loader() {
  // const response = await fetch(
  //   "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  // );
  const response = await fetch(`${baseUrl}/product/all`, {
    credentials: "include",
    method: "get",
  });
  if (!response.ok) {
    throw json({ message: "Could not get products data" }, { status: 500 });
  }
  const data = await response.json();
  return data;
}
