import { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../../api/apiClient";
import ToastUtil from "../../utils/notiUtils";

const Register = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");

        const { email, username, password, gender, dateOfBirth } = data;
        const formattedDateOfBirth = dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : null;

        try {
            const response = await apiClient.post("/signup", {
                email, username, password, gender, dateOfBirth: formattedDateOfBirth,
            });

            if (response.status === 201) {
                ToastUtil.success("Đăng ký thành công");
                navigate("/login");
            }
        } catch (error) {
            ToastUtil.error("Có lỗi đã xảy ra");
            setErrMsg("Đăng ký thất bại, vui lòng thử lại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <div className="login-container flex-row relative h-[100vh] w-[100vw]">
                <div className="form-container text-lg flex flex-col justify-between h-[90vh] w-[100%]" >

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="form login-form flex-col justify-center w-[100%]"
                        autoComplete="on"
                    >
                        <div className="text-center p-3 text-3xl font-bold">
                            Tạo tài khoản mới
                        </div>
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
                                className="form-input p-3"
                                placeholder="Tên Người Dùng"
                                {...register("username", { required: "Username is required" })}
                            />
                            {errors.username && <p className="error-message">{errors.username.message}</p>}
                        </div>
                        <div className="form-row">
                            <input
                                type="password"
                                className="form-input"
                                placeholder="Mật khẩu"
                                {...register("password", { required: "Password is required" })}
                            />
                            {errors.password && <p className="error-message">{errors.password.message}</p>}
                        </div>
                        <div className="form-row">
                            <select
                                className="form-input"
                                {...register("gender", { required: "Gender is required" })}
                            >
                                <option value="female">Nữ</option>
                                <option value="male">Nam</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className='form-row' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
                            <label htmlFor='dateOfBirth' className='form-label'>
                                <div>Ngày sinh</div>
                            </label>
                            <Controller
                                control={control}
                                name="dateOfBirth"
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Chọn ngày sinh'
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="dd/MM/yyyy"
                                        selected={field.value}
                                    />
                                )}
                            />
                        </div>
                        <button type="submit" className="btn-submit" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng ký"}
                        </button>
                        {errMsg && <p className="error-message">{errMsg}</p>}
                    </form>
                    <div className="flex justify-center items-center w-[100%]" style={{ flex: "0 0 15%" }}>
                        <Link to="/login">
                            <span className="textunderline">Đã có tài khoản? Đăng nhập</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper >
    );
};

export default Register;
