import './App.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AppRoute } from './routes/AppRoute';

export const routes =
  [
    ...AppRoute,
  ];

const router = createBrowserRouter(
  routes
);

function App() {
  return (
    <main className="bg-orange-100 dark:bg-gray-900 min-h-screen " >
      <RouterProvider router={router} />
    </main>
  );
}

export default App;