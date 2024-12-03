import { Logo } from '../../components';
import Wrapper from '../../assets/wrappers/RegisterAndLoginPage';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import "../../assets/css/react_datepicker.css";
import image from '../../assets/images/imagelogin.png';
import "react-datepicker/dist/react-datepicker.css";
import apiClient from '../../api/apiClient';

const Register = () => {
    const { register, handleSubmit, control, formState: { errors }, } = useForm();
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const { email, gender, password, username, dateOfBirth } = data;

        // Ensure dateOfBirth is formatted as yyyy-MM-dd
        const formattedDateOfBirth = dateOfBirth
            ? dateOfBirth.toISOString().split('T')[0]
            : null;


        try {
            console.log("Formatted Data", { email, username, password, gender, dateOfBirth: formattedDateOfBirth });
            const response = await apiClient.post("/signup", {
                email, username, password, gender, dateOfBirth: formattedDateOfBirth,
            });
            if (response.status === 201) {
                navigate("/login")
            }
            console.log("Response:", response);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Wrapper>
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }} className='left-side'>
                <form className='form' onSubmit={handleSubmit(onSubmit)}>
                    <Logo />
                    <h4>Đăng ký</h4>
                    <div className='form-row'>
                        <input
                            className='form-input'
                            placeholder='Email'
                            {...register("email", { required: "Email is required" })}
                        />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className='form-row'>
                        <input
                            type='text'
                            placeholder='Tên Người Dùng'
                            className='form-input'
                            {...register("username", { required: "Username is required" })}
                        />
                        {errors.username && <p>{errors.username.message}</p>}
                    </div>
                    <div className='form-row'>
                        <input
                            type='password'
                            placeholder=' Mật khẩu'
                            className='form-input'
                            {...register("password", { required: "Password is required" })}
                        />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className='form-row' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "fit-content" }}>
                        <label htmlFor='gender' className='form-label'>
                            <div>Chọn giới tính</div>
                        </label>
                        <select
                            className='form-input'
                            {...register("gender", { required: "Gender is required" })}>
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
                    <input type='submit' className='btn btn-block' />
                    <p>
                        Bạn đã có tài khoản?
                        <Link to='/login' className='member-btn'>
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
            <div className='right-side'>
                <img src={image} alt='Login' className='login-image' />
            </div>
        </Wrapper>
    );
};

export default Register;
