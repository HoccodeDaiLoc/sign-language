import ReactDOM from "react-dom";
import "../../assets/css/modal_login.css";

function Modal({ children, isOpen, onClose }) {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
            <div className="modal-overlay" >
                <div className="modal-box">
                    <div
                        className="modal-container"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {children}

                    </div>
                </div>
            </div>
        </div>,
        document.querySelector("body")
    );
}

export default Modal;