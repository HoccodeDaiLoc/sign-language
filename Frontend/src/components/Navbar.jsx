import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';

const Navbar = () => {
    const { toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h4 className='logo-text'>Sign Language <i class="fa-solid fa-ear-deaf"></i></h4>
                </div>
                <div className='btn-container'>
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;