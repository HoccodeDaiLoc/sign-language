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
import axios from "axios";

const Landing = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = store.getState().auth.isAuthenticated;
    const user = store.getState().auth.user;
    const googleLoginUrl = "https://bright-boss-grouper.ngrok-free.app/v1/api/google";

    useEffect(() => {
        if (auth && user?.role === "user") {
            navigate("/user/upload");
        } if (auth && user?.role === "admin") {
            navigate("/admin/home");
        }
    }, [auth, navigate, user]);
    const [userData, setUserData] = useState(null);
    const [isLoginGoogle, setIsLoginGoogle] = useState(false);
    useEffect(() => {
        const handleGoogleLogin = async () => {
            try {
                console.log("day ne")
                const response = await axios.get("https://bright-boss-grouper.ngrok-free.app/v1/api/google/callback", {
                    withCredentials: true,
                });
                console.log("response", response);
                if (response.data.status === 200) {
                    setUserData(response.data.metadata);
                    console.log("User Data:", response.data.metadata);
                } else {
                    console.error("Unexpected response:", response.data);
                }
                setIsLoginGoogle(false)
            } catch (error) {
                console.error("Error during Google login:", error.response?.data || error.message);
            }
        }
        handleGoogleLogin()
    }, [isLoginGoogle])



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

    return auth ? null : (
        <Wrapper>
            <div className="login-container flex-row relative min-h-screen w-full" >
                <div className="w-[50%] h-auto flex flex-col justify-center items-center">
                    <img src={Logo} style={{ width: "300px", height: "100px", marginRight: "auto" }} />
                    <span className="w-[85%] text-3xl break-normal pt-6 mr-auto">
                        HandTalk giúp bạn có thể dễ dàng học tập ngôn ngữ kí hiệu hơn
                    </span>
                </div>
                <div className="form-container text-lg flex flex-col justify-between h-auto w-[50%]">
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
                                {...register("password", { required: "Hãy nhập mật khẩu" })}
                            />
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>

                        <div className="flex justify-center align-items-center textunderline py-2">
                            <Link to="/forgot-password" className="forgot-password">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button type="submit" className="btn-submit w-full" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                        {errMsg && <p className="error-message">{errMsg}</p>}

                        <div className="social-login  w-full">
                            <button className="social-btn w-full" onClick={() => {
                                setIsLoginGoogle(true);
                                window.open(googleLoginUrl, "_blank");
                            }}>
                                <img src={google} alt="google Icon" />
                                <p>Đăng nhập bằng Google</p>
                            </button>


                            <button className="social-btn w-full" >
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

        </Wrapper>
    );
};


export default Landing;
