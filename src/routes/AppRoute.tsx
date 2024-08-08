
import ErrorPage from "./ErrorPage";
import { StoreForm } from "../components/store/StoreForm";
import { ProductList } from "../components/product/ProductList";
import { BaseTemplate } from "../components/BaseTemplate";
import { StoreList } from "../components/store/StoreList";
import { ProductForm } from "../components/product/ProductForm";
import { HomePage } from "../components/HomePage";
import { ShopTemplate } from "../components/shop/ShopTemplate";
import { ProductDetailPage } from "../components/product/ProductDetail";
import { StoreDetailPage } from "../components/store/StoreDetail";

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
        path: "/stores/:storeId/edit",
        element: <StoreForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stores/:storeId/products",
        element: <ProductList></ProductList>,
      },
      {
        path: "/stores/:storeId/products/:productId/edit",
        element: <ProductForm />, errorElement: <ErrorPage />,
      },
      {
        path: "/stores/:storeId/products/new",
        element: <ProductForm />, errorElement: <ErrorPage />,
      },
      {
        path: "finance",
        element: <h1 className="dark:text-white">Finance App</h1>,
      },
      {
        path: "shop",
        element: <ShopTemplate />,
      },
      {
        path: "/stores/:storeId/products/:productId",
        element: <ProductDetailPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stores/new",
        element: <StoreForm />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/stores/:storeId",
        element: <StoreDetailPage />,
        errorElement: <ErrorPage />,
      },
     

    ]
  },
];
