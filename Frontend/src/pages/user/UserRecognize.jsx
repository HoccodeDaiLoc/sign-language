import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faCircleXmark,
    faExclamationCircle,
    faVideoCamera,
    faComments,
} from "@fortawesome/free-solid-svg-icons";

const UserRecognize = () => {
    const videoRef = useRef(null);
    const [status, setStatus] = useState("Not connected");
    const [messages, setMessages] = useState([]);
    const [isCamActive, setIsCamActive] = useState(false);
    const [showPermissionDialog, setShowPermissionDialog] = useState(false);
    const [permissionGranted, setPermissionGranted] = useState(false);
    const socketRef = useRef(null);
    const fps = 30;
    const batchSize = 30;
    let frameBuffer = useRef([]);

    const statusIcons = {
        Connected: <FontAwesomeIcon icon={faCircle} className="text-green-500 mr-2" />,
        Disconnected: <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 mr-2" />,
        Error: <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500 mr-2" />,
    };

    const requestPermission = async () => {
        try {
            await navigator.mediaDevices.getUserMedia({ video: true });
            setPermissionGranted(true);
            setShowPermissionDialog(false);
        } catch (error) {
            console.error("Permission denied:", error);
            alert("Permission denied. Please allow camera access.");
            setShowPermissionDialog(false);
        }
    };

    const toggleCam = async () => {
        if (isCamActive) {
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
                videoRef.current.srcObject = null;
            }
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
            }
            setIsCamActive(false);
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: 720, height: 480 },
                });
                videoRef.current.srcObject = stream;
                setIsCamActive(true);
            } catch (error) {
                console.error("Error starting webcam:", error);
            }
        }
    };
    const captureFrame = (videoElement) => {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg");
    };

    const sendFrameBatch = (frames) => {
        const socket = socketRef.current;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(
                JSON.stringify({
                    event: "frame_batch",
                    frames: frames,
                })
            );
        }
    };

    useEffect(() => {
        if (isCamActive) {
            const initializeWebSocket = async () => {
                const socket = new WebSocket("ws://localhost:8080?userId=123");
                socketRef.current = socket;

                socket.onopen = () => {
                    setStatus("Connected");
                    console.log("WebSocket connection established.");
                };

                socket.onmessage = (event) => {
                    setMessages((prev) => [...prev, event.data]);
                };

                socket.onerror = () => {
                    setStatus("Error");
                };

                socket.onclose = () => {
                    setStatus("Disconnected");
                };
            };

            initializeWebSocket();

            return () => {
                if (socketRef.current) socketRef.current.close();
            };
        }
    }, [isCamActive, permissionGranted]);
    useEffect(() => {
        let interval;

        if (isCamActive) {
            interval = setInterval(() => {
                if (videoRef.current) {
                    const frame = captureFrame(videoRef.current);
                    frameBuffer.current.push(frame);
                    if (frameBuffer.current.length === batchSize) {
                        sendFrameBatch(frameBuffer.current);
                        frameBuffer.current = [];
                    }
                }
            }, 1000 / fps);
        }

        return () => {
            clearInterval(interval);
            frameBuffer.current = [];
        };
    }, [isCamActive]);

    return (
        <div className="w-full mx-auto p-6 h-full">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col h-[80vh]  w-3/4 items-center">
                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Nhận diện ngay các kí hiệu ngôn ngữ của bạn
                    </h1>
                    <div className="relative w-full">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-[60vh] rounded-lg border-2 border-gray-300 shadow-lg"
                        ></video>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            {statusIcons[status] || null}
                            <strong>Status:</strong> {status}
                        </div>
                    </div>
                </div>
                <div className="h-[80vh] w-1/4">

                    <div className="mb-6 flex items-center justify-center">
                        <FontAwesomeIcon icon={faVideoCamera} className="w-6 h-6 text-gray-500 mr-2" />
                        <button
                            onClick={toggleCam}
                            className={`px-4 py-2 ${isCamActive ? "bg-red-500" : "bg-green-500"} text-white rounded-lg`}
                        >
                            {isCamActive ? "Turn Off Camera" : "Turn On Camera"}
                        </button>
                    </div>
                    <div className=" bg-white rounded-lg shadow-lg border border-gray-300 p-4">

                        <div className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                            <FontAwesomeIcon icon={faComments} className="w-5 h-5 text-blue-500 mr-2" />
                            Ký hiệu được nhận diện
                        </div>
                        <div className="overflow-y-auto max-h-[60vh] bg-gray-100 rounded-lg p-3 border border-gray-200">
                            {messages.length > 0 ? (
                                messages.map((msg, index) => (
                                    <div key={index} className="p-2 mb-2 text-sm bg-blue-100 text-blue-700 rounded">
                                        {msg}
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No messages yet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showPermissionDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-[2000]">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Allow Camera Access</h2>
                        <p className="text-sm text-gray-600 mb-6">
                            We need your permission to use your camera. Please allow access.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={requestPermission}
                                className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2"
                            >
                                Allow
                            </button>
                            <button
                                onClick={() => setShowPermissionDialog(false)}
                                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserRecognize;
