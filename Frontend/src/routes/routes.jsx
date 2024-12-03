import Unauthorized from "../pages/Unauthorized.jsx";
import Landing from "../pages/guest/Landing.jsx";
import Register from "../pages/guest/Register.jsx";
import Login from "../pages/guest/Login.jsx";
import Error from "../pages/Error.jsx";
import UserHome from "../pages/user/UserHome.jsx";
import UserCall from "../pages/user/UserCall.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";
import UserUploadVideo from "../pages/user/UserUploadVideo.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";

export const routes = {
    common: [
        {
            path: "/",
            element: <Landing />
        },
        {
            path: "/register",
            element: <Register />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/unauthorized",
            element: <Unauthorized />
        },
        {
            path: "*",
            element: <Error />
        }
    ],
    user: [
        // {
        //     path: "/user/home",
        //     element: <UserHome />
        // },
        {
            path: "/user/call",
            element: <UserCall />,
        },
        {
            path: "/user/profile",
            element: <UserProfile />,
        },
        {
            path: "/user/upload",
            element: <UserUploadVideo />,
        },
    ],
    admin: [
        {
            path: "/admin/home",
            element: <AdminHome />,
        },
    ]
}
