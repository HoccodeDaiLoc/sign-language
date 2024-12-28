import ReactDOM from "react-dom";
import clsx from "clsx";

const modalConfigurations = {
    logout: {
        modalClass: "inset-y-0 right-0 flex items-center justify-end",
        modelContainer: "absolute top-24 right-3",
        modelContext: "relative bg-white rounded-lg shadow-lg p-6 max-w-[600px] w-[300px] max-h-[600px]",
    },
    videoupload: {
        modalClass: "inset-0 flex items-center justify-center",
        modelContainer: "w-4/5 h-4/5",
        modelContext: "w-full h-full rounded-lg p-6",
    },
    default: {
        modalClass: "fixed inset-0 flex items-center justify-center",
        modelContainer: "",
        modelContext: "",
    },
};

function Modal({ children, isOpen, onClose, component, portalTarget = "body" }) {
    if (!isOpen) return null;

    const { modalClass, modelContainer, modelContext } =
        modalConfigurations[component] || modalConfigurations.default;

    const modalBaseClass = "fixed inset-0 flex z-[1000] w-full h-full";
    const backdropClass = "backdrop-filter: blur(1px); bg-black bg-opacity-60";

    return ReactDOM.createPortal(
        <div
            className={clsx(modalBaseClass, backdropClass, modalClass)}
            onClick={onClose}
        >
            <div className={modelContainer}>
                <div
                    className={modelContext}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>,
        document.querySelector(portalTarget)
    );
}

export default Modal;
