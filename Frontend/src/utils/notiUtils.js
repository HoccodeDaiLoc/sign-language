import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastUtil = {
    //={} => trong đây là giá trị default 
    success: (message, options = {}) => toast.success(message, options),
    error: (message, options = {}) => toast.error(message, options),
    info: (message, options = {}) => toast.info(message, options),
    warn: (message, options = {}) => toast.warn(message, options),
    custom: (message, options = {}) => toast(message, options),
}

export default ToastUtil;