import NavLinks from './NavLinks';
import Logo from './common/Logo';
import Wrapper from '../assets/wrappers/BigSidebar';
import { useDashboardContext } from '../layouts/Layout';

const BigSidebar = () => {
    const { showSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div
                className={
                    showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
                }
            >
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <NavLinks isBigSidebar={true} />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;