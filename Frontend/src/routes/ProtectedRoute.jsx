import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentAccessToken, selectCurrentUser } from '../auth/authSlice';

export default function ProtectedRoute({ allowedRole }) {
    const AccessToken = useSelector(selectCurrentAccessToken);
    const currentUser = useSelector(selectCurrentUser);
    const location = useLocation()
    console.log("currentAccessToken", AccessToken)

    return (
        AccessToken && currentUser.role === "user"
            ? <Outlet />
            : AccessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
        // AccessToken ? auth?.roles?.find(role => allowedRole?.includes(role))
        // ? <Outlet /> : auth?.user
        //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //     : <Navigate to="/login" state={{ from: location }} replace />
        // : <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
}
