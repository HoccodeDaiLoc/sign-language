import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/RegisterAndLoginPage';
import { Link, NavLink } from 'react-router-dom';
import image from '../../assets/images/imagelogin.png'; // Thay đổi đường dẫn tới hình ảnh của bạn
import BackButton from '../../components/common/BackButton';
const Login = () => {
    return (
        <Wrapper>
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }} className='left-side'>
                <BackButton size={"40px"}></BackButton>
                <form className='form'>
                    <h4>Đăng nhập</h4>
                    <FormRow type='email' name='email' placeholder='Nhập email của bạn' />
                    <FormRow type='password' name='Mật khẩu' placeholder='**********' />
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
            <div className='right-side'>
                <img src={image} alt='Login' className='login-image' />
            </div>
        </Wrapper>
    );
};
export default Login;


