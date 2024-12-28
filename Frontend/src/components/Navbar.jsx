import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from '../layouts/Layout';
import LogoutContainer from './LogoutContainer';
import SearchBarTransition from './common/SearchBarTransition';
import { store } from '../utils/store';
import Logo from './common/Logo';

const Navbar = () => {
    const role = store.getState().auth.user.role;

    const { toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div style={{ width: "80%" }}>
                    {
                        role === "user" ? (
                            <SearchBarTransition size="80%"></SearchBarTransition>

                        ) :
                            (
                                <Logo></Logo>
                            )
                    }
                </div>
                <div className='btn-container'>
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;