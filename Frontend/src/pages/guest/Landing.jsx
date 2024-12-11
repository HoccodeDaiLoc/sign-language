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
import twitter from "../../assets/svg/Twitter X.svg";
import Logo from '../../assets/images/Logo.png'
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

    useEffect(() => {
        if (auth) {
            navigate("/user/call");
        }
    }, [auth, navigate]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");

        const result = await authServices.login(data, dispatch);

        setIsLoading(false);
        if (result.success) {
            ToastUtil.success("Đăng nhập thành công");
            navigate("/user/call");
        } else {
            ToastUtil.error("Có lỗi đã xảy ra");
            setErrMsg(result.error);
        }
    };

    return auth ? null : (
        <Wrapper>
            <div className="login-container flex-row relative h-[100vh] w-[100vw]"
            >
                <div className="w-[50%]  h-[100vh] flex flex-col justify-center items-center  ">
                    <img src={Logo} style={{ width: "300px", height: "100px", marginRight: "auto", mixBlendMode: "" }} />

                    <span className="w-[85%] text-3xl break-normal pt-6 mr-auto">
                        HandTalk giúp bạn có thể dễ dàng học tập ngôn ngữ kí hiệu hơn
                    </span>
                </div>
                <div className="form-container text-lg	 flex flex-col justify-between h-[90vh] w-[50%]" style={{ paddingTop: "10vh" }}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="form login-form flex-col justify-center w-[100%]"
                        style={{ flex: "0 0 85%" }}
                        autoComplete="on"
                    >
                        <div className="form-row">
                            <input
                                className="form-input p-3"
                                placeholder="Email"
                                {...register("email", { required: "Email is required" })}
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

                        <div className=" flex justify-center align-items-center textunderline  py-2">
                            <Link to="/forgot-password" className="forgot-password">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button type="submit" className="btn-submit" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                        {errMsg && <p className="error-message">{errMsg}</p>}

                        <div className="social-login">
                            <button className="social-btn">
                                <img src={google} alt="google Icon" />
                                <p>Đăng nhập bằng Google</p>
                            </button>
                            <button className="social-btn">
                                <img src={facebook} alt="facebook Icon" />
                                <p>Đăng nhập bằng Facebook</p>
                            </button>
                            <button className="social-btn">
                                <img src={twitter} alt="twitter Icon" />
                                <p>Đăng nhập bằng Twitter</p>
                            </button>
                        </div>
                    </form>

                    <div className="flex justify-center items-center  w-[100%]" style={{ flex: "0 0 15%" }}>
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
