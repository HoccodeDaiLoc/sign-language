import AppRoutes from "./routes/AppRoute.jsx";
import { ToastContainer } from 'react-toastify'
const App = () => {
  return <>
    <AppRoutes></AppRoutes>
    <ToastContainer></ToastContainer>
  </>
    ;
};

export default App;
