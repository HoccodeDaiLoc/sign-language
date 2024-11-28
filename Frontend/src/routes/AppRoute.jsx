import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollTop from "../components/common/ScrollTop";
import { ROLE_ADMIN, ROLE_USER } from "../constants/Roles";
import UserLayout from "../layouts/UserLayout";
import HomeLayout from "../layouts/HomeLayout";
import ProtectedRoute from "./ProtectedRoute";
import { routes } from "./routes";
import AdminLayout from "../layouts/AdminLayout";
import { AuthProvider } from "../context/authProvider";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <ScrollTop />
                <Routes>
                    <Route path="/" element={<HomeLayout />}>
                        {renderRoute(routes.common)}
                    </Route>

                    <Route path="/user" element={<UserLayout />}>
                        <Route element={<ProtectedRoute allowedRoles={[ROLE_USER]} />}>
                            {renderRoute(routes.user)}
                        </Route>
                    </Route>

                    <Route path="/admin" element={<AdminLayout />}>
                        <Route element={<ProtectedRoute allowedRoles={[ROLE_ADMIN]} />}>
                            {renderRoute(routes.admin)}
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

const renderRoute = (routes) => {
    return routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
    ));
};
