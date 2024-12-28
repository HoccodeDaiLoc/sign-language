import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div style={{ height: "100%" }}>
            <Outlet />
        </div>
    );
}

export default HomeLayout;