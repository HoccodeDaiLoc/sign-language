import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../auth/authSlice';
import useAuth from '../../hooks/useAuth';
import DashboardLayout from '../../layouts/UserLayout';

function AuthRequire() {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const { auth } = useAuth();
    return (
        token && auth?.role?.find ? <DashboardLayout />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default AuthRequire