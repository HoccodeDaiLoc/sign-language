import { FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link, NavLink } from 'react-router-dom';
import image from '../assets/images/imagelogin.png'; // Thay đổi đường dẫn tới hình ảnh của bạn

const Login = () => {
    return (
        <Wrapper>
            <div className='login-container'>
                <form className='form'>
                    <h4>Đăng nhập</h4>
                    <FormRow type='email' name='email' defaultValue='hovanthao0611cs@gmail.com' />
                    <FormRow type='password' name='Mật khẩu' defaultValue='Vanthao123@' />

                    <div className='remember-forgot'>
                        <label>
                            <input type='checkbox' /> Nhớ mật khẩu
                        </label>
                        <Link to='/forgot-password' className='forgot-password'>
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <NavLink to='/dashboard'>
                        <button type='submit' className='btn btn-block'>
                            Đăng nhập
                        </button>
                    </NavLink>
                    <p>
                        Bạn chưa có tài khoản?
                        <Link to='/register' className='member-btn'>
                            Đăng kí
                        </Link>
                    </p>
                </form>
            </div>
        </Wrapper>
    );
};
export default Login;