import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from '../layouts/UserLayout';
import LogoutContainer from './LogoutContainer';
import SearchBarTransition from './common/SearchBarTransition';

const Navbar = () => {
    const { toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div style={{ width: "80%" }}>
                    <SearchBarTransition size="80%"></SearchBarTransition>
                </div>
                <div className='btn-container'>
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;