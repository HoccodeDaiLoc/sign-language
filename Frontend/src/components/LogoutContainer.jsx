import { useState } from "react";
import Wrapper from "../assets/wrappers/LogoutContainer";
import Modal from "../components/common/Modal";
import { useDashboardContext } from "../layouts/UserLayout";
import logoutSVG from "../assets/svg/signout.svg"
import personSVG from "../assets/svg/person.svg"
import settingSVG from "../assets/svg/setting.svg"
import themeSVG from "../assets/svg/water.svg"

const LogoutContainer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const handleLogout = () => {
        setIsModalOpen(false);
        logoutUser();
    };

    return (
        <Wrapper>
            <button
                type="button"
                className="btn logout-btn"
                style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%" }}
                onClick={() => setIsModalOpen(true)}
            >
                <img src={user.avatar ?? { personSVG }} alt="avatar" className="img" />
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{
                        display: "flex", flexDirection: "column",
                        padding: "0.5rem", borderBottom: "0.1rem solid #e5e7eb", justifyContent: "center", alignItems: "center"
                    }}>
                        <img style={{ width: "4rem", height: "4rem" }} src={user.avatar}></img>
                        <p style={{ padding: "0.5rem", fontWeight: "bold" }}>{user.username}</p>
                        <p style={{}}>{user.role}</p>
                    </div>
                    <div>
                        <div style={{ display: "flex", flexDirection: "column", padding: "1rem 0.5rem", borderBottom: "0.3px solid #e5e7eb" }}>
                            <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                <img style={{ width: "2rem", height: "2rem" }} src={personSVG}></img>

                                <p style={{ padding: "0.5rem", fontWeight: "500px" }} >Thông tin cá nhân</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "0.5rem" }}>

                            <img style={{ width: "2rem", height: "2rem" }} src={settingSVG}></img>

                            <p style={{ padding: "0.5rem", fontWeight: "500px" }} >Cài đặt</p>

                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "0.5rem" }}>
                            <img style={{ width: "2rem", height: "2rem" }} src={themeSVG}></img>
                            <p style={{ padding: "0.5rem", fontWeight: "500px" }} >Đổi màu chủ đề</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "0.5rem" }}>
                            <p style={{ padding: "0.5rem", fontWeight: "500px" }} >Chọn ngôn ngữ</p>
                        </div>
                    </div>
                    <div
                        onClick={handleLogout}
                        style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", padding: "0.5rem" }}>
                        <img style={{ width: "2rem", height: "2rem" }} src={logoutSVG}></img>
                        <p style={{ padding: "0.5rem", fontWeight: "500px" }} > Đăng xuất</p>
                    </div>
                </div>

            </Modal>
        </Wrapper >
    );
};

export default LogoutContainer;
