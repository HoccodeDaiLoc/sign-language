import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faCircleXmark,
  faExclamationCircle,
  faVideoCamera,
  faComments,
} from "@fortawesome/free-solid-svg-icons";

const VideoWebSocket = () => {
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const [status, setStatus] = useState("Not connected");
  const [messages, setMessages] = useState([]);
  const fps = 30; // Frames per second
  const batchSize = 30; // Number of frames per batch
  let frameBuffer = useRef([]); // Buffer for batching frames

  const statusIcons = {
    Connected: <FontAwesomeIcon icon={faCircle} className="text-green-500 mr-2" />,
    Disconnected: <FontAwesomeIcon icon={faCircleXmark} className="text-red-500 mr-2" />,
    Error: <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500 mr-2" />,
  };

  // Start webcam and WebSocket connection
  useEffect(() => {
    const initializeWebcamAndSocket = async () => {
      try {
        // Access webcam stream
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 720, height: 480 },
        });
        if (videoRef.current) videoRef.current.srcObject = stream;

        // WebSocket setup
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

        // Send frames periodically
        const interval = setInterval(() => {
          if (videoRef.current) {
            const frame = captureFrame(videoRef.current);
            frameBuffer.current.push(frame);

            // Send batch of frames when buffer is full
            if (frameBuffer.current.length === batchSize) {
              sendFrameBatch(frameBuffer.current);
              frameBuffer.current = []; // Clear buffer
            }
          }
        }, 1000 / fps);

        return () => {
          clearInterval(interval);
          if (socketRef.current) socketRef.current.close();
        };
      } catch (err) {
        console.error("Error initializing webcam or WebSocket:", err);
        setStatus("Error");
      }
    };

    initializeWebcamAndSocket();
  }, []);

  // Capture single frame
  const captureFrame = (videoElement) => {
    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg"); // Return base64 string
  };

  // Send a batch of frames
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Real-time Video Streaming with WebSocket
      </h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {/* Video Section */}
        <div className="relative w-full md:w-2/3">
          <div className="flex items-center justify-center mb-2">
            <FontAwesomeIcon icon={faVideoCamera} className="w-6 h-6 text-gray-500 mr-2" />
            <span className="text-gray-700 font-semibold">Webcam Feed</span>
          </div>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-auto rounded-lg border-2 border-gray-300 shadow-lg"
          ></video>
          <div className="mt-4 text-center text-sm text-gray-600">
            {statusIcons[status] || null}
            <strong>Status:</strong> {status}
          </div>
        </div>

        {/* WebSocket Messages */}
        <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg border border-gray-300 p-4">
          <div className="flex items-center text-lg font-semibold text-gray-700 mb-3">
            <FontAwesomeIcon icon={faComments} className="w-5 h-5 text-blue-500 mr-2" />
            WebSocket Messages
          </div>
          <div className="overflow-y-auto max-h-64 bg-gray-100 rounded-lg p-3 border border-gray-200">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className="p-2 mb-2 text-sm bg-blue-100 text-blue-700 rounded"
                >
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
  );
};

export default VideoWebSocket;
