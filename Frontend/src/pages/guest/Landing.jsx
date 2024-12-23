import { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authServices from "../../api/authServices";
import { useForm } from "react-hook-form";
import ToastUtil from "../../utils/notiUtils";
import { store } from "../../utils/store";
import google from "../../assets/svg/google.svg";
import facebook from "../../assets/svg/facebook.svg";
import Logo from "../../assets/images/Logo.png";
import { FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaInstagram, FaPhone } from "react-icons/fa";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
};


const Landing = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = store.getState().auth.isAuthenticated;

    const user = store.getState().auth.user;
    useEffect(() => {
        if (auth && user.role === "user") {
            navigate("/user/call");
        } if (auth && user.role === "admin") {

            navigate("/admin/home");
            if (auth) {
                navigate("/user");
            }

        }
    }, [auth, navigate, user]);


    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");

        const result = await authServices.login(data, dispatch);

        setIsLoading(false);
        if (result.success) {
            ToastUtil.success("Đăng nhập thành công");
            if (user.role === "user") {
                navigate("/user/call");
            } if (user.role === "admin") {

                navigate("/admin/home");
            }
            navigate("/user");
        } else {
            ToastUtil.error("Có lỗi đã xảy ra");
            setErrMsg(result.error);
        }
    };

    const mockFacebookLogin = () => {
        const FacebookUser = {
            email: "pnhan0195@gmail.com",
            password: "1234",
        };

        setValue("email", FacebookUser.email);
        setValue("password", FacebookUser.password);
        ToastUtil.success(
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={facebook} alt="Facebook Icon" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                Đăng nhập bằng Facebook thành công
            </div>
        );
    };

    const openGoogleLoginModal = () => {
        setIsModalOpen(true);
    };

    const closeGoogleLoginModal = () => {
        setIsModalOpen(false);
    };

    return auth ? null : (
        <Wrapper>
            <div className="login-container flex-row relative min-h-screen w-full" style={{ marginBottom: "-100px" }}>
                <div className="w-[50%] h-auto flex flex-col justify-center items-center">
                    <img src={Logo} style={{ width: "300px", height: "100px", marginRight: "auto" }} />
                    <span className="w-[85%] text-3xl break-normal pt-6 mr-auto">
                        HandTalk giúp bạn có thể dễ dàng học tập ngôn ngữ kí hiệu hơn
                    </span>
                </div>
                <div className="form-container text-lg flex flex-col justify-between h-auto w-[50%]" style={{ paddingTop: "20px" }}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="form login-form flex-col justify-center w-[100%]"
                        autoComplete="on"
                    >
                        <div className="form-row">
                            <input
                                className="form-input p-3"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                        message: "Email phải có định dạng @gmail.com",
                                    },
                                })}
                            />
                            {errors.email && <p className="error-message">{errors.email.message}</p>}
                        </div>
                        <div className="form-row">
                            <input
                                autoComplete="on"
                                type="password"
                                placeholder="Mật khẩu"
                                className="form-input"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>

                        <div className="flex justify-center align-items-center textunderline py-2">
                            <Link to="/forgot-password" className="forgot-password">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button type="submit" className="btn-submit" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                        {errMsg && <p className="error-message">{errMsg}</p>}

                        <div className="social-login">
                            <button className="social-btn" onClick={openGoogleLoginModal}>
                                <img src={google} alt="google Icon" />
                                <p>Đăng nhập bằng Google</p>
                            </button>
                            <button className="social-btn" onClick={mockFacebookLogin}>
                                <img src={facebook} alt="facebook Icon" />
                                <p>Đăng nhập bằng Facebook</p>
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center items-center w-full">
                        <Link to="/register">
                            <span className="textunderline">Chưa có tài khoản? Đăng ký</span>
                        </Link>
                    </div>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={closeGoogleLoginModal}>

                <Box
                    sx={{
                        ...modalStyle,
                        width: "600px",
                        textAlign: "center",
                        marginTop: "-180px",
                    }}
                >
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
                        Đăng nhập bằng Google
                    </h2>
                    <p style={{ fontSize: "16px", marginBottom: "24px" }}>
                        Vui lòng chọn tài khoản:
                    </p>
                    <div className="fake-accounts flex flex-col space-y-4">
                        <button
                            className="fake-account-btn flex items-center space-x-4 p-3 rounded transition hover:bg-gray-300"
                            style={{
                                backgroundColor: "#f1f1f1",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={() => {
                                const fakeUser1 = {
                                    email: "customer1@gmail.com",
                                    password: "1234",
                                };
                                setValue("email", fakeUser1.email);
                                setValue("password", fakeUser1.password);

                                ToastUtil.success(
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            src={google}
                                            alt="Google Icon"
                                            style={{ width: "40px", height: "40px", marginRight: "10px" }}
                                        />
                                        Google đăng xử lý .....
                                    </div>
                                );
                                setTimeout(() => {
                                    handleSubmit(onSubmit)({
                                        email: fakeUser1.email,
                                        password: fakeUser1.password,
                                    });
                                    closeGoogleLoginModal();
                                }, 5200);
                            }}
                        >
                            <img
                                src={google}
                                alt="Google Icon"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "16px", display: "block" }}>Nguyen Quang Hai</span>
                                <span style={{ fontSize: "12px", display: "block", color: "gray", marginTop: "8px", marginLeft: "-10px" }}>customer1@gmail.com</span>
                            </div>

                        </button>

                        <button
                            className="fake-account-btn flex items-center space-x-4 p-3 rounded transition hover:bg-gray-300"
                            style={{
                                backgroundColor: "#f1f1f1",
                                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                            onClick={() => {
                                const fakeUser2 = {
                                    email: "vietnam1122@gmail.com",
                                    password: "1234",
                                };
                                setValue("email", fakeUser2.email);
                                setValue("password", fakeUser2.password);
                                ToastUtil.success(
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            src={google}
                                            alt="Google Icon"
                                            style={{ width: "40px", height: "40px", marginRight: "10px" }}
                                        />
                                        Google đăng xử lý .....
                                    </div>
                                );

                                setTimeout(() => {
                                    handleSubmit(onSubmit)({
                                        email: fakeUser2.email,
                                        password: fakeUser2.password,
                                    });
                                    closeGoogleLoginModal();
                                }, 5200); // Đợi 5.2 giây
                            }}
                        >
                            <img
                                src={google}
                                alt="Google Icon"
                                style={{ width: "30px", height: "30px" }}
                            />
                            <div style={{ textAlign: "center" }}>
                                <span style={{ fontSize: "16px", display: "block", marginRight: "70px" }}>Thanh Ho</span>
                                <span style={{ fontSize: "12px", display: "block", color: "gray", marginTop: "8px", marginLeft: "2px" }}>thanhho1212@gmail.com</span>
                            </div>
                        </button>
                        <div className="use-other-account mt-4">
                            <span
                                onClick={closeGoogleLoginModal}
                                style={{ cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center" }}
                            >
                                <i className="fas fa-user" style={{ marginRight: "8px", fontSize: "16px", marginLeft: "155px", marginBottom: "5px" }}></i>
                                Sử dụng một tài khoản Google khác
                            </span>
                        </div>


                    </div>
                    <button
                        className="mt-4"
                        style={{
                            backgroundColor: "#ff4d4f",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            marginTop: "10px",
                            marginBottom: "-10px",
                            fontSize: "16px",
                            border: "none",
                            cursor: "pointer",
                        }}
                        onClick={closeGoogleLoginModal}
                    >
                        Đóng
                    </button>
                </Box>
            </Modal>


            {/* Footer */}
            <footer className="footer bg-gray-800 text-white py-4 mt-3" style={{ width: "1500px" }}>
                <div className="footer-content flex justify-between px-10">
                    <div className="footer-section logo w-1/3">
                        <img src={Logo} alt="Logo" className="logo-img" />
                    </div>
                    <div className="footer-section about w-1/3" style={{ marginLeft: "-320px" }}>
                        <p style={{ fontSize: "20px" }}>Country & Region : SIGN LANGUAGE</p>
                        <div className="contact mt-4 flex flex-col space-y-2">
                            <div className="flex items-center space-x-2">
                                <FaEnvelope />
                                <a href="mailto:info@example.com">Email: info@example.com</a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaMapMarkerAlt />
                                <span>Địa chỉ: 54 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaPhone />
                                <span>Hotline: 0235.222.111</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer-section links w-1/3">
                        <ul style={{ marginLeft: "190px", fontSize: "20px", lineHeight: "40px" }}>
                            <p> Liên hệ : </p>
                            <li className="flex items-center space-x-2">
                                <FaFacebook />
                                <a href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">Facebook</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaYoutube />
                                <a href="https://www.youtube.com/example" target="_blank" rel="noopener noreferrer">YouTube</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaInstagram />
                                <a href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">Instagram</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <p style={{ marginBottom: "90px", marginLeft: "600px" }}>&copy; 2024 HandTalk. Tất cả quyền được bảo lưu.</p>
                <div className="flex justify-center mt-2">
                    <Link to="/privacy-policy" className="text-white mx-4">Chính sách bảo mật</Link>
                    <Link to="/terms" className="text-white mx-4">Điều khoản sử dụng</Link>
                </div>
            </footer>
        </Wrapper>
    );
};

export default Landing;
