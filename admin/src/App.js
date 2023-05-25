import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, {
  loader as rootLoader,
} from "./components/Layout/RootLayout";
import CartPage from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import CheckoutPage, { action as checkoutAction } from "./pages/Checkout";
import DetailPage, { loader as detailLoader } from "./pages/Detail";
import HomePage, { loader as trendingLoader } from "./pages/Home";
import LoginPage, { action as loginAction } from "./pages/Login";
import RegisterPage, { action as registerAction } from "./pages/Register";
import ShopPage, { loader as shopLoader } from "./pages/Shop";
import HistoryPage, { loader as historyLoader } from "./pages/History";
import AdminRoot, { loader as adminRootLoader } from "./Admin/AdminRoot";
import ProductList, {
  loader as listLoader,
} from "./Admin/ProductList/ProductList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: rootLoader,
    children: [
      { index: true, element: <HomePage />, loader: trendingLoader },
      { path: "shop", element: <ShopPage />, loader: shopLoader },
      { path: "history", element: <HistoryPage />, loader: historyLoader },
      {
        path: "detail/:productId",
        element: <DetailPage />,
        loader: detailLoader,
      },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage />, action: checkoutAction },
      { path: "register", element: <RegisterPage />, action: registerAction },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "error", element: <ErrorPage /> },
      {
        path: "admin",
        id: "admin",
        element: <AdminRoot />,
        loader: adminRootLoader,
        children: [
          { index: true, element: <ProductList />, loader: listLoader },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
