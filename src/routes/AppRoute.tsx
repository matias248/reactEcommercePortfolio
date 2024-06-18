
import ErrorPage from "./ErrorPage";
import { StoreForm } from "../components/store/StoreForm";
import { ProductList } from "../components/product/ProductList";
import { BaseTemplate } from "../components/BaseTemplate";
import { StoreList } from "../components/store/StoreList";
import { ProductForm } from "../components/product/ProductForm";
import { HomePage } from "../components/HomePage";
import { ShopTemplate } from "../components/shop/ShopTemplate";

export const AppRoute = [
  {
    path: "",
    element: <BaseTemplate />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "stores",
        element: <StoreList></StoreList>,
      },
      {
        path: "/stores/:storeId",
        element: <StoreForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stores/:storeId/products",
        element: <ProductList></ProductList>,
      },
      {
        path: "/stores/:storeId/products/:productId",
        element: <ProductForm />, errorElement: <ErrorPage />,
      },
      {
        path: "finance",
        element: <h1 className="dark:text-white">Finance App</h1>,
      },
      {
        path: "shop",
        element:<ShopTemplate/>,
      },


    ]
  },
];
