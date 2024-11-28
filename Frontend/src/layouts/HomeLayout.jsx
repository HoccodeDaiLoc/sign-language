import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <div style={{ height: "100%", overflow: "hidden" }}>
            <Outlet />
        </div>
    );
}

export default HomeLayout;