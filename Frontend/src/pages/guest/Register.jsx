import { Logo, FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/RegisterAndLoginPage';
import { Link } from 'react-router-dom';
import image from '../../assets/images/imagelogin.png'; // Thay đổi đường dẫn tới hình ảnh của bạn

const Register = () => {
    return (
        <Wrapper>
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "column" }} className='left-side'>

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
            </div>

            <div className='right-side'>
                <img src={image} alt='Login' className='login-image' />
            </div>
        </Wrapper>
    );
};
export default Register;