import './App.css';

import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import { AppRoute } from './routes/AppRoute';

export const routes =
  [
    ...AppRoute,
  ];

const router = createHashRouter(
  routes
);

function App() {
  return (
    <main className="bg-slate-200	dark:bg-gray-900 min-h-screen " >
      <RouterProvider router={router} />
    </main>
  );
}

export default App;