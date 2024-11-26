import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from './routes/routes.jsx'; // import routes từ file routes.js

const router = createBrowserRouter(routes); // sử dụng routes từ file riêng

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
