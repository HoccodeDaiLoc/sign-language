import { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authServices from "../../api/authServices";
import { useForm } from "react-hook-form";
import BackButton from "../../components/common/BackButton";
import image from "../../assets/images/imagelogin.png";
import ToastUtil from "../../utils/notiUtils";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");

        const result = await authServices.login(data, dispatch);

        setIsLoading(false);
        if (result.success) {
            ToastUtil.success("Đăng nhập thành công");
            navigate("/user/call");
        } else {
            ToastUtil.success("Có lỗi đã xảy ra");
            setErrMsg(result.error);
        }
    };

    return (
        <Wrapper>
            <div style={{ display: "flex", flexDirection: "column" }} className="left-side">
                <BackButton size="40px" />
                <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="on">
                    <h4>Đăng nhập</h4>

                    <div className="form-row">
                        <input
                            className="form-input"
                            placeholder="Email"
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="form-row">
                        <input
                            autoComplete="on"
                            type="password"
                            placeholder="Mật khẩu"
                            className="form-input"
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Nhớ mật khẩu
                        </label>
                        <Link to="/forgot-password" className="forgot-password">
                            Quên mật khẩu?
                        </Link>
                    </div>
                    <button type="submit" className="btn btn-block" disabled={isLoading}>
                        {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                    </button>

                    {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}

                    <p>
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/register" className="member-btn">
                            Đăng kí
                        </Link>
                    </p>
                </form>
            </div>
            <div className="right-side">
                <img src={image} alt="Login" className="login-image" />
            </div>
        </Wrapper>
    );
};

export default Login;
