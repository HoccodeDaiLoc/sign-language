import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function BackButton({ size }) {

    const navigate = useNavigate();
    return (
        <button style={{ border: "none", width: "fit-content", height: "fit-content", cursor: "pointer" }} onClick={() => navigate(-1)}>
            <FaArrowAltCircleLeft style={{ width: `${size}`, height: `${size}` }}></FaArrowAltCircleLeft>
        </button>
    )
}

export default BackButton