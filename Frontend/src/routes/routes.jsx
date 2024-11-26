import {
    HomeLayout,
    Landing,
    Register,
    Login,
    DashboardLayout,
    Error,
    CallVideo,
    Profile,
    Logout,
    UploadVideo,
    History,
} from "../pages/index.js";

export const routes = [
    {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "dashboard",
                element: <DashboardLayout />,
                children: [
                    {
                        index: true,
                        element: <CallVideo />,
                    },
                    {
                        path: "upload",
                        element: <UploadVideo />,
                    },
                    {
                        path: "history",
                        element: <History />,
                    },
                    {
                        path: "profile",
                        element: <Profile />,
                    },
                    {
                        path: "logout",
                        element: <Logout />,
                    },
                ],
            },
        ],
    },
];
