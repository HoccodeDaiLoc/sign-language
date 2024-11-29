
import { ImProfile } from 'react-icons/im';
import { FaVideo, FaCloudUploadAlt, FaBell } from 'react-icons/fa';

const links = [
    { text: 'Call video', path: '.', icon: <FaVideo /> },
    { text: 'Tải video', path: 'upload', icon: <FaCloudUploadAlt /> },
    // { text: 'Lịch sử', path: 'history', icon: <FaHistory /> },
    { text: 'Thông tin cá nhân', path: 'profile', icon: <ImProfile /> },
    // { text: 'Thông báo', path: 'notification', icon: <FaBell /> },
];

export default links;