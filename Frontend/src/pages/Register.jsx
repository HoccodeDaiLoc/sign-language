import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <Wrapper>
            <form className='form'>
                <Logo />
                <h4>Đăng ký</h4>
                <FormRow type='text' name='Tên' />
                <FormRow type='text' name='Họ' labelText='Họ' />
                <FormRow type='text' name='Địa chỉ' />
                <FormRow type='email' name='email' />
                <FormRow type='password' name='Mật khẩu' />

                <button type='submit' className='btn btn-block'>
                    Đăng ký
                </button>
                <p>
                    Bạn đã có tài khoản?
                    <Link to='/login' className='member-btn'>
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
};
export default Register;