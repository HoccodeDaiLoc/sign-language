import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken, selectCurrentUser } from '../auth/authSlice';

export default function ProtectedRoute({ allowedRole }) {
    const AccessToken = useSelector(selectCurrentAccessToken);
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation()

    return (
        currentUser?.role === "user" && AccessToken
            ? <Outlet />
            :
            <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
