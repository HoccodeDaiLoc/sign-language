import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const links = [
    { text: 'Lịch trình', path: '.', icon: <FaWpforms /> },
    { text: 'Công ty dọn dẹp', path: 'company', icon: <MdQueryStats /> },
    { text: 'Lịch sử', path: 'history', icon: <IoBarChartSharp /> },
    { text: 'Thông tin cá nhân', path: 'profile', icon: <ImProfile /> },
    { text: 'Đăng xuất', path: 'logout', icon: <LogoutOutlinedIcon /> },
];

export default links;