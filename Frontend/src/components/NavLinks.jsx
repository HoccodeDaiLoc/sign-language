import { useDashboardContext } from '../layouts/Layout';
import links from '../utils/links';
import linksAdmin from '../utils/linksAdmin';

import { NavLink } from 'react-router-dom';
import { store } from '../utils/store';

const NavLinks = ({ isBigSidebar = false }) => {
    const { toggleSidebar } = useDashboardContext();
    const role = store.getState().auth.user.role ?? null;
    return (
        <div className='nav-links'>
            {role === "admin" ? (
                linksAdmin.map((link) => {
                    const { text, path, icon } = link;
                    return (
                        <NavLink
                            to={path}
                            key={text}
                            onClick={isBigSidebar ? null : toggleSidebar}
                            className='nav-link'
                            end
                        >
                            <span className='icon'>{icon}</span>
                            {text}
                        </NavLink>
                    );
                })
            ) : (
                links.map((link) => {
                    const { text, path, icon } = link;
                    return (
                        <NavLink
                            to={path}
                            key={text}
                            onClick={isBigSidebar ? null : toggleSidebar}
                            className='nav-link'
                            end
                        >
                            <span className='icon'>{icon}</span>
                            {text}
                        </NavLink>
                    );
                })
            )}
        </div>
    );
};

export default NavLinks;
