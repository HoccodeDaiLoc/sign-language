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
import InputField from "../../components/InputField";
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
        }
        if (auth && user.role === "admin") {
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
            <div className="login-container flex-row relative h-[100vh] w-[100vw]">
                <div className="form-container text-lg flex flex-col justify-between items-center h-[90vh] w-[100%]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="form login-form flex-col justify-center w-[100%]"
                        autoComplete="on"
                    >
                        <InputField
                            type="email"
                            placeholder="Email"
                            name="email"
                            label="Email"
                            register={register}
                            validationRules={{
                                required: "Hãy nhập email",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Email không đúng định dạng",
                                },
                            }}
                            errors={errors}
                        />
                        <InputField
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            label="Password"
                            register={register}
                            validationRules={{
                                required: "Hãy nhập mật khẩu",
                                validate: {
                                    minLength: (value) =>
                                        value.length >= 8 || "Mật khẩu phải có ít nhất 8 kí tự",
                                    hasUpperCase: (value) =>
                                        /[A-Z]/.test(value) || "Mật khẩu phải có ít nhất 1 kí tự hoa",
                                    hasLowerCase: (value) =>
                                        /[a-z]/.test(value) || "Mật khẩu phải có ít nhất 1 kí tự thường",
                                    hasNumber: (value) =>
                                        /\d/.test(value) || "Mật khẩu phải có ít nhất 1 kí tự số",
                                },
                            }}
                            errors={errors}
                        />
                        <div className="flex justify-center align-items-center textunderline py-2">
                            <Link to="/forgot-password" className="forgot-password">
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button type="submit" className="btn-submit w-full" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                        </button>
                        {errMsg && <p className="error-message">{errMsg}</p>}
                        <div className="social-login w-full">
                            <button className="social-btn w-full">
                                <img src={google} alt="google Icon" />
                                <p>Đăng nhập bằng Google</p>
                            </button>
                            <button className="social-btn w-full">
                                <img src={facebook} alt="facebook Icon" />
                                <p>Đăng nhập bằng Facebook</p>
                            </button>
                        </div>
                    </form>
                    <div className="flex justify-center items-center w-[100%]" style={{ flex: "0 0 15%" }}>
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
