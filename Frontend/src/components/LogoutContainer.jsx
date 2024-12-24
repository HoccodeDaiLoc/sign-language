import { useEffect, useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";
import Modal from "../components/common/Modal";
import { useDashboardContext } from "../layouts/Layout";
import logoutSVG from "../assets/svg/signout.svg";
import personSVG from "../assets/svg/person.svg";
import settingSVG from "../assets/svg/setting.svg";
import themeSVG from "../assets/svg/water.svg";
import languageSVG from "../assets/svg/language.svg";
import "../assets/css/logout_container.css";
import { Link } from "react-router-dom";
import { store } from "../utils/store";
import { useDispatch } from "react-redux";
import { setTheme } from '../features/themeSlice';
const LogoutContainer = () => {
    const theme = store.getState().theme.theme;
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const toggleTheme = () => {
        dispatch(setTheme(theme === "light-theme" ? "dark-theme" : "light-theme"));
    }
    useEffect(() => {
        document.body.className = theme === 'dark-theme' ? 'dark-theme' : 'light-theme';
    }, [theme]);
    console.log(theme)
    const handleLogout = () => {
        setIsModalOpen(false);
        logoutUser();
    };
    return (
        user === null ? null :
            <Wrapper>
                <div onClick={() => setIsModalOpen(true)}>
                    <img
                        style={{ width: "2.5rem", height: "2.5rem", cursor: "pointer" }}
                        src={user.avatar ?? personSVG}
                        alt="avatar"
                        className="img"
                    />
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <img src={user.avatar ?? personSVG} alt="user avatar" />
                            <p>{user.username}</p>
                        </div>

                        <div className="menu-item px-1 my-2">
                            <Link
                                to="/user/profile"
                                onClick={() => setIsModalOpen(false)}
                                className="menu-item-container"
                            >
                                <img src={personSVG} alt="personal info" />
                                <p>Thông tin cá nhân</p>
                            </Link>
                        </div>
                        <div className="py-2" style={{ borderTop: "1px solid #e5e7eb" }}>
                            <div className="menu-item">
                                <div className="menu-item-container">
                                    <img src={settingSVG} alt="settings" />
                                    <p>Cài đặt</p>
                                </div>
                            </div>

                            <div className="menu-item">
                                <div
                                    onClick={() => {
                                        toggleTheme();
                                        setIsModalOpen(false)
                                    }}
                                    className="menu-item-container"
                                >
                                    <img src={themeSVG} alt="theme" />
                                    <p>Đổi màu chủ đề</p>
                                </div>
                            </div>

                            <div className="menu-item">
                                <div className="menu-item-container">
                                    <img src={languageSVG} alt="languageSVG" />
                                    <p>Chọn ngôn ngữ</p>
                                </div>
                            </div>
                            <div onClick={handleLogout} className="menu-item">
                                <div className="menu-item-container">
                                    <img src={logoutSVG} alt="logout" />
                                    <p>Đăng xuất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Wrapper>
    );
};

export default LogoutContainer;
