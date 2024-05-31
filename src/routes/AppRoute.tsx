
import ErrorPage from "./ErrorPage";
import { StoreForm } from "../components/store/StoreForm";
import { currentStores } from "../LocalData/Stores";
import { ProductList } from "../components/product/ProductList";
import { BaseTemplate } from "../components/BaseTemplate";
import { StoreList } from "../components/store/StoreList";
import { ProductForm } from "../components/product/ProductForm";
import { HomePage } from "../components/HomePage";

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
        element: <BaseTemplate />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "",
            element: <StoreList></StoreList>
          },
          { path: ":storeId", element: <StoreForm />, errorElement: <ErrorPage /> },

          {
            path: ":storeId/products",
            element: <ProductList></ProductList>
          },
          {
            path: ":storeId/products/:productId",
            element: <ProductForm />, errorElement: <ErrorPage />
          },
        ]
      },
    ]
  },
];
