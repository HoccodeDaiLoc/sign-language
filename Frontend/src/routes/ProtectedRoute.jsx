import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectCurrentToken } from '../auth/authSlice';

export default function ProtectedRoute({ allowedRole }) {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const { auth } = useAuth();
    console.log(location);
    console.log(token);
    console.log(auth)
    return (
        token ? auth?.roles?.find(role => allowedRole?.includes(role))
            ? <Outlet /> : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
