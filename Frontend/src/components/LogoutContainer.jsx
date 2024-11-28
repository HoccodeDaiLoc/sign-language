import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook điều hướng
import { useDashboardContext } from '../layouts/UserLayout';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };

    return (
        <Wrapper>
            <button
                type='button'
                className='btn logout-btn'
                onClick={() => setShowLogout(!showLogout)}
            >
                {user.avatar ? (
                    <img src={user.avatar} alt='avatar' className='img' />
                ) : (
                    <FaUserCircle />
                )}
                {user?.name}
                <FaCaretDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button
                    type='button'
                    className='dropdown-btn'
                    onClick={handleLogout}
                >
                    Đăng xuất
                </button>
            </div>
        </Wrapper>
    );
};

export default LogoutContainer;
