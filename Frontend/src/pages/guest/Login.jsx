import { useState } from "react";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/imagelogin.png";
import BackButton from "../../components/common/BackButton";
import { useDispatch } from "react-redux";
import apiClient from '../../api/apiClient';
import { login } from "../../auth/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const response = await apiClient.post("/login",
                { email, password });
            console.log(response)
            const accessToken = response.data.metadata.token.accessToken;
            const refreshToken = response.data.metadata.token.refreshToken;
            const user = response.data.metadata.user;
            const role = response.data.metadata.user.role;
            dispatch(login({ accessToken, refreshToken, user, role }));
            navigate("/user/home");
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg('No Server Response');
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
    };

    return (
        <Wrapper>
            <div style={{ display: "flex", flexDirection: "column" }} className="left-side">
                <BackButton size="40px" />
                <form className="form" onSubmit={handleSubmit}>
                    <h4>Đăng nhập</h4>
                    {errMsg}
                    {error && <p className="error-message">{error}</p>}

                    <FormRow
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                    />
                    <FormRow
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="**********"
                    />
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
