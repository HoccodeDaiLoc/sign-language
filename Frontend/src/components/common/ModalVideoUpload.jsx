import ReactDOM from "react-dom";
import "../../assets/css/modal_video.css";

function ModalVideo({ children, isOpen, onClose }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.querySelector("body")
    );
}

export default ModalVideo;