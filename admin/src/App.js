import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout, {
  loader as rootLoader,
} from "./components/Layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import LoginPage, { action as loginAction } from "./pages/Login";
import AdminRoot, { loader as adminRootLoader } from "./Admin/AdminRoot";
import ProductList, {
  loader as listLoader,
} from "./Admin/ProductList/ProductList";
import ChatPage, { loader as chatLoader } from "./pages/ChatPage";
import Dashboard from "./pages/Dashboard";
import ProductForm, {
  loader as productFormLoader,
} from "./Admin/ProductForm/ProductForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: rootLoader,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "chat", element: <ChatPage />, loader: chatLoader },
      { path: "error", element: <ErrorPage /> },
      {
        path: "admin",
        id: "admin",
        element: <AdminRoot />,
        loader: adminRootLoader,
        children: [
          { index: true, element: <ProductList />, loader: listLoader },
          { path: "new", element: <ProductForm action="new" /> },
          {
            path: "edit/:productId",
            element: <ProductForm action="edit" />,
            loader: productFormLoader,
          },
        ],
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
