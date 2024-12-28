import { useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterAndLoginPage";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import apiClient from "../../api/apiClient";
import ToastUtil from "../../utils/notiUtils";

import InputField from "../../components/InputField";

const Register = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");
        try {
            const response = await apiClient.post("/signup", {
                ...data,
                dateOfBirth: data.dateOfBirth?.toISOString().split("T")[0],
            });
            if (response.status === 201) {
                ToastUtil.success("Đăng ký thành công");
                navigate("/login");
            }
        } catch {
            ToastUtil.error("Có lỗi đã xảy ra");
            setErrMsg("Đăng ký thất bại, vui lòng thử lại");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Wrapper>
            <div className="login-container flex-row relative h-[100vh] w-[100vw]">
                <div className="form-container text-lg flex flex-col justify-between items-center h-[90vh] w-[100%]">
                    <form onSubmit={handleSubmit(onSubmit)} className="form login-form flex-col justify-center w-[100%]" autoComplete="on">
                        <InputField
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
                            placeholder="Tên Người Dùng"
                            name="username"
                            label="Username"
                            register={register}
                            validationRules={{
                                required: "Hãy nhập tên người dùng",
                                validate: {
                                    minLength: (value) =>
                                        value.length >= 8 || "Tên người dùng ít nhất có 8 kí tự",
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
                            }} errors={errors}
                        />
                        <div className="form-row">
                            <select
                                className="form-input"
                                {...register("gender", { required: "Hãy chọn giới tính" })}
                            >
                                <option value="female">Nữ</option>
                                <option value="male">Nam</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className="form-row flex flex-col space-y-2">
                            <label htmlFor="dateOfBirth" className="form-label text-sm font-medium text-gray-700">
                                Ngày sinh <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                control={control}
                                name="dateOfBirth"
                                rules={{
                                    required: "Vui lòng chọn ngày sinh",
                                    validate: {
                                        isPastDate: (value) =>
                                            value && value < new Date() || "Ngày sinh phải trước ngày hiện tại",
                                    },
                                }}
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText="Chọn ngày sinh"
                                        onChange={(date) => field.onChange(date)}
                                        dateFormat="dd/MM/yyyy"
                                        selected={field.value}
                                        className="form-input w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    />
                                )}
                            />
                            {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth.message}</p>}
                        </div>
                        <button type="submit" className="btn-submit w-full" disabled={isLoading}>
                            {isLoading ? "Đang xử lý..." : "Đăng ký"}
                        </button>
                        {errMsg && <p className="error-message">{errMsg}</p>}
                    </form>
                    <div className="flex justify-center items-center w-[100%] mt-8">
                        <Link to="/login">
                            <span className="textunderline">Đã có tài khoản? Đăng nhập</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Register;


