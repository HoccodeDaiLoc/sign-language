import { Outlet, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../components';
import { useState, createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../utils/store';
import authServices from "../api/authServices";
import ToastUtil from '../utils/notiUtils';
import Cookies from 'js-cookie'
const DashboardContext = createContext();
const UserLayout = () => {
    const dispatch = useDispatch();
    const user = store.getState().auth.user;
    const navigate = useNavigate()
    const [showSidebar, setShowSidebar] = useState(false);
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        console.log(user)
        console.log(Cookies.get("accessToken"))
        const result = await authServices.logOut(dispatch);
        if (result.success) {
            ToastUtil.success("Đăng xuất thành công");
            navigate("/");
        } else {
            ToastUtil.error("Đã có lỗi xảy ra");
            console.log(result)
            setErrMsg(result.error);
        }
    };


    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                toggleSidebar,
                logoutUser,
            }}
        >

            <Wrapper>
                <main className='dashboard'>
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className='dashboard-page'>
                            <Outlet />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);

export default UserLayout;