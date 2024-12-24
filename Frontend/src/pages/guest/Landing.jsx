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
import { FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaInstagram, FaPhone, FaUser } from "react-icons/fa";
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
        if (auth && user?.role === "user") {
            navigate("/user/upload");
        } if (auth && user?.role === "admin") {
            navigate("/admin/home");
        }
    }, [auth, navigate, user]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");

        const result = await authServices.login(data, dispatch);

        setIsLoading(false);
        if (result.success) {
            ToastUtil.success("Đăng nhập thành công");
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

    const handleFakeAccountLogin = (fakeUser) => {
        // Điền thông tin giả vào form và tự động gọi onSubmit để đăng nhập
        setValue("email", fakeUser.email);
        setValue("password", fakeUser.password);
        ToastUtil.success(
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={google} alt="Google Icon" style={{ width: "40px", height: "40px", marginRight: "10px" }} />
                 Đang xử lý thông tin ...
            </div>,
            {
                autoClose: 1500, 
                hideProgressBar: true, 
                closeButton: false, 
            }
        );
        

        setTimeout(() => {
            handleSubmit(onSubmit)({
                email: fakeUser.email,
                password: fakeUser.password,
            });
        }, 2000); 
    };

    return auth ? null : (
        <Wrapper>
            <div className="login-container flex-row relative min-h-screen w-full" style={{ marginBottom: "180px" }}>
                <div className="w-[50%] h-auto flex flex-col justify-center items-center">
                    <img src={Logo} style={{ width: "300px", height: "100px", marginRight: "auto" }} />
                    <span className="w-[85%] text-3xl break-normal pt-6 mr-auto">
                        HandTalk giúp bạn có thể dễ dàng học tập ngôn ngữ kí hiệu hơn
                    </span>
                </div>
                <div className="form-container text-lg flex flex-col justify-between h-auto w-[50%]" style={{ paddingTop: "80px" }}>
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
                    <br />
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
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#dae5e7",
                        height: "100vh",
                        padding: "20px",
                    }}
                >
                    <Box
                        sx={{
                            ...modalStyle,
                            width: "550px",
                            height: "400px",
                            textAlign: "center",
                            marginTop: "-0px",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            padding: "20px",
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
                                style={{ backgroundColor: "#f1f1f1", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                                onClick={() => handleFakeAccountLogin({
                                    email: "customer1@gmail.com",
                                    password: "1234"
                                })}
                            >
                                <img src={google} alt="Google Icon" style={{ width: "30px", height: "30px" }} />
                                <div style={{ textAlign: "center" }}>
                                    <span style={{ fontSize: "16px", display: "block" }}>Nguyen Quang Hai</span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            display: "block",
                                            color: "gray",
                                            marginTop: "8px",
                                            marginLeft: "-10px",
                                        }}
                                    >
                                        customer1@gmail.com
                                    </span>
                                </div>
                            </button>

                            <button
                                className="fake-account-btn flex items-center space-x-4 p-3 rounded transition hover:bg-gray-300"
                                style={{ backgroundColor: "#f1f1f1", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
                                onClick={() => handleFakeAccountLogin({
                                    email: "vietnam1122@gmail.com",
                                    password: "1234"
                                })}
                            >
                                <img src={google} alt="Google Icon" style={{ width: "30px", height: "30px" }} />
                                <div style={{ textAlign: "center" }}>
                                    <span style={{ fontSize: "16px", display: "block",  marginRight: "68px", }}>Thanh Ho</span>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            display: "block",
                                            color: "gray",
                                            marginTop: "8px",
                                            marginLeft: "2px",
                                        }}
                                    >
                                        thanhho1212@gmail.com
                                    </span>
                                </div>
                            </button>

                            <div
                                className="fake-account-btn flex items-center space-x-4 p-3 rounded transition hover:bg-gray-300"
                                style={{
                                    backgroundColor: "#f1f1f1",
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                    cursor: "pointer",
                                }}
                                onClick={closeGoogleLoginModal}
                            >
                                <FaUser
                                    style={{
                                        fontSize: "20px",
                                        color: "#555",
                                    }}
                                />
                                <div style={{ textAlign: "center" }}>
                                    <span style={{ fontSize: "16px", display: "block", marginRight: "70px" }}>
                                        Sử dụng một tài khoản Google khác
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="mt-4"
                            style={{
                                backgroundColor: "#ff4d4f",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                marginTop: "30px",
                                fontSize: "16px",
                                border: "none",
                                cursor: "pointer",
                            }}
                            onClick={closeGoogleLoginModal}
                        >
                            Đóng
                        </button>
                    </Box>
                </Box>
            </Modal>
        </Wrapper>
    );
};


export default Landing;
