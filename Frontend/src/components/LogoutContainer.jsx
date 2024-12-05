import { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";
import Modal from "../components/common/Modal";
import { useDashboardContext } from "../layouts/UserLayout";
import logoutSVG from "../assets/svg/signout.svg";
import personSVG from "../assets/svg/person.svg";
import settingSVG from "../assets/svg/setting.svg";
import themeSVG from "../assets/svg/water.svg";
import languageSVG from "../assets/svg/language.svg";


import "../assets/css/logout_container.css";

const LogoutContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const handleLogout = () => {
        setIsModalOpen(false);
        logoutUser();
    };

    return (
        <Wrapper>
            <div
                onClick={() => setIsModalOpen(true)}
            >
                <img style={{ width: "2.5rem", height: "2.5rem", cursor: "pointer" }} src={user.avatar ?? personSVG} alt="avatar" className="img" />
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-content">
                    <div className="modal-header">
                        <img src={user.avatar ?? personSVG} alt="user avatar" />
                        <p>{user.username}</p>
                    </div>

                    <div className="menu-item" style={{ borderBottom: "1px solid #e5e7eb", padding: " 0.5rem" }}>
                        <div className="menu-item-container">
                            <img src={personSVG} alt="personal info" />
                            <p>Thông tin cá nhân</p>
                        </div>
                    </div>
                    <div style={{ marginTop: "0.5rem" }}>
                        <div className="menu-item">
                            <div className="menu-item-container">
                                <img src={settingSVG} alt="settings" />
                                <p>Cài đặt</p>
                            </div>
                        </div>

                        <div className="menu-item">
                            <div className="menu-item-container">
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

            </Modal >
        </Wrapper >
    );
};

export default LogoutContainer;
