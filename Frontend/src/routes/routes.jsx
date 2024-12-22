import Unauthorized from "../pages/Unauthorized.jsx";
import Register from "../pages/guest/Register.jsx";
import Login from "../pages/guest/Login.jsx";
import Error from "../pages/Error.jsx";
import UserCall from "../pages/user/UserCall.jsx";
import UserProfile from "../pages/user/UserProfile.jsx";
import UserUploadVideo from "../pages/user/UserUploadVideo.jsx";
import AdminHome from "../pages/admin/AdminHome.jsx";
import Landing from "../pages/guest/Landing.jsx";
import UserRecognize from "../pages/user/UserRecognize.jsx";
import UserSearchResult from "../pages/user/UserSearchResult.jsx";
import SearchBarTransition from "../components/common/SearchBarTransition.jsx";

export const routes = {
    common: [
        {
            path: "/",
            element: <Landing />,
            index: true,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
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
        {
            path: "/user/",
            element: <UserRecognize />
        },
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
        {
            path: "/user/searchresult",
            element: <UserSearchResult />
        },
    

    ],
    admin: [
        {
            path: "/admin/home",
            element: <AdminHome />,
        },
    ]
}
