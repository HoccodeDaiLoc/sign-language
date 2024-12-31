import Wrapper from '../assets/wrappers/Navbar';
import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from '../layouts/Layout';
import LogoutContainer from './LogoutContainer';
import SearchBarTransition from './common/SearchBarTransition';
import { store } from '../utils/store';

const Navbar = () => {
    const user = store.getState().auth.user;
    const { toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div style={{ width: "80%" }}>
                    {user.role === "user" &&
                        <SearchBarTransition
                            search="sign"
                            size="80%"
                            placeholder="Tìm kiếm..."
                        />}
                </div>
                <div className='btn-container'>
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;
