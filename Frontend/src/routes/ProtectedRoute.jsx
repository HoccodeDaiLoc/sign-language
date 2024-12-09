import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken, selectCurrentUser } from '../features/authSlice';

export default function ProtectedRoute({ allowedRoles }) {
    const AccessToken = useSelector(selectCurrentAccessToken);
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation()
    if (currentUser && AccessToken && allowedRoles.includes(currentUser.role)) {
        return <Outlet />;
    } else {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
}
