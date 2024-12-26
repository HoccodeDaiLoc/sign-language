import { useState, useRef } from "react";

function CameraToggle() {
    const [isCameraOn, setIsCameraOn] = useState(false); // State to toggle camera
    const [permissionGranted, setPermissionGranted] = useState(false); // State for permission
    const videoRef = useRef(null); // Reference to the video element

    const requestPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setPermissionGranted(true);
            alert("Permission granted! You can now turn on the camera.");
        } catch (error) {
            console.error("Permission denied:", error);
            alert("Permission denied. Please allow camera access.");
        }
    };

    const toggleCamera = async () => {
        if (!permissionGranted) {
            alert("You need to grant permission first!");
            return;
        }
        if (!isCameraOn) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoRef.current.srcObject = stream;
                videoRef.current.play();
                setIsCameraOn(true);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        } else {
            // Turn off the camera
            const stream = videoRef.current.srcObject;
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop()); // Stop all tracks
            }
            videoRef.current.srcObject = null;
            setIsCameraOn(false);
        }
    };

    return (
        <div>
            <button onClick={requestPermission}>
                {permissionGranted ? "" : "Request Permission"}
            </button>
            <button onClick={toggleCamera} disabled={!permissionGranted}>
                {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            </button>
            <div>
                <video ref={videoRef} style={{ display: isCameraOn ? "block" : "none", width: "100%" }} />
            </div>
        </div>
    );
}

export default CameraToggle;
