
import ErrorPage from "./ErrorPage";
import { StoreForm } from "../components/store/StoreForm";
import { BaseTemplate } from "../components/BaseTemplate";
import { StoreList } from "../components/store/StoreList";
import { HomePage } from "../components/HomePage";
import { StoreDetailPage } from "../components/store/StoreDetail";
import { ProductDetailPage } from "../components/product/ProductDetail";
import { ProductList } from "../components/product/ProductList";
import { ProductForm } from "../components/product/ProductForm";
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
        path: "/stores/:storeId/edit",
        element: <StoreForm />,
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
      {
        path: "/stores/:storeId/products/:productId",
        element: <ProductDetailPage />,
        errorElement: <ErrorPage />,
      },

      {
        path: "/stores/:storeId/products",
        element: <ProductList/>,
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
        path: "shop",
        element: <ShopTemplate />,
      }
    ]
  },
];
/*
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
*/