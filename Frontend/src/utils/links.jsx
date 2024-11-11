import React from 'react';

import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { FaVideo ,FaCloudUploadAlt,FaBell } from 'react-icons/fa';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const links = [
    { text: 'Call video', path: '.', icon: <FaVideo /> },
    { text: 'Tải video', path: 'company', icon: <FaCloudUploadAlt /> },
    { text: 'Thông tin cá nhân', path: 'profile', icon: <ImProfile /> },
    { text: 'Thông báo', path: 'history', icon: <FaBell  /> },
    { text: 'Đăng xuất', path: 'logout', icon: <LogoutOutlinedIcon /> },
    
];

export default links;