import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';

import { Link, NavLink } from 'react-router-dom';

const Login = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Đăng nhập</h4>
                <FormRow type='email' name='email' defaultValue='hovanthao0611cs@gmail.com' />
                <FormRow type='password' name='Mật khẩu' defaultValue='Vanthao123@' />

                <NavLink to='/dashboard'>
                    <button type='submit' className='btn btn-block'>
                        Đăng nhập
                    </button>
                </NavLink>

                <button type='button' className='btn btn-block'>
                    Khám phá ứng dụng
                </button>
                <p>
                    Bạn chưa có tài khoản?
                    <Link to='/register' className='member-btn'>
                        Đăng kí
                    </Link>
                </p>
            </form>
        </Wrapper >
    );
};
export default Login;