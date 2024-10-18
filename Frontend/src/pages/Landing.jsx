import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            Xin <span>Chào</span>
          </h1>
          <p>
            Chào mừng bạn đến với hệ thống đặt lịch dọn dẹp.
          </p>
          <Link to='/register' className='btn register-link'>
            Đăng ký
          </Link>
          <Link to='/login' className='btn'>
            Đăng nhập
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;