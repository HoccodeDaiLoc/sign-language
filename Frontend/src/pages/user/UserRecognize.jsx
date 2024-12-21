import './Usercall.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "react-toastify/dist/ReactToastify.css";
import RealTimeVideoStreaming from "../../components/user/RealTimeVideoStreaming";

const UserRecognize = () => {


    return (
        <div className="container ">
            <RealTimeVideoStreaming></RealTimeVideoStreaming>
        </div>
    );
};

export default UserRecognize;
