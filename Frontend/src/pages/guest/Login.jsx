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

const Login = () => {
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
    const user = store.getState().auth.user ?? null;
    useEffect(() => {
        if (auth && user.role === "user") {
            navigate("/user/upload");
        } if (auth && user.role === "admin") {

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

    return auth ? null : (
        <Wrapper>
            <div className="login-container flex-row relative h-[100vh] w-[100vw]"
            >
                <div className="form-container text-lg flex flex-col justify-between h-[90vh] w-[100%]" >
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

export default Login;
