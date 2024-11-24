import React, { useRef, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import "./Schedule.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Schedule = () => {
    const webcamRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isConfirmingEndCall, setIsConfirmingEndCall] = useState(false); // State kiểm soát hộp thoại

    useEffect(() => {
        if (isCameraOn) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (webcamRef.current) {
                        webcamRef.current.srcObject = stream;
                    }
                })
                .catch((err) => {
                    console.error("Error accessing webcam: ", err);
                });
        } else {
            if (webcamRef.current && webcamRef.current.srcObject) {
                const tracks = webcamRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
                webcamRef.current.srcObject = null;
            }
        }
    }, [isCameraOn]);

    const handleSendMessage = () => {
        if (inputValue.trim() === "") return;

        const newMessage = {
            content: inputValue,
            sender: "me",
            time: new Date().toLocaleTimeString(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputValue("");

        setTimeout(() => {
            const fakeReply = {
                content: "Thầy ông nội đây con. Con ăn cơm chưa?",
                sender: "other",
                time: new Date().toLocaleTimeString(),
            };
            setMessages((prevMessages) => [...prevMessages, fakeReply]);
        }, 1500);
    };

    const toggleCamera = () => {
        setIsCameraOn((prev) => !prev);
    };

    const confirmEndCall = () => {
        setIsConfirmingEndCall(true); // Mở hộp thoại
    };

    const handleEndCall = () => {
        toast.info("Cuộc gọi đã được kết thúc!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            icon: <i className="fas fa-phone" style={{color:"#2e55af"}} ></i>,
        });
        setIsConfirmingEndCall(false); // Đóng hộp thoại
    };

    return (
        <div className="container">
            <div className="video-call-section">
                <div className="video-container">
                    <video
                        className="main-video"
                        ref={webcamRef}
                        autoPlay
                        muted
                    ></video>
                    <div className="participants">
                        <div className="thumbnail">
                            <i
                                className="fas fa-user"
                                style={{
                                    color: "#67aaad",
                                    fontSize: "110px",
                                    marginLeft: "30px",
                                    marginTop: "10px",
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <button className="control-button" onClick={toggleCamera}>
                        <i className={`fas ${isCameraOn ? "fa-video" : "fa-video-slash"}`}></i>
                    </button>
                    <button className="control-button end-call" onClick={confirmEndCall}>
                        <i className="fas fa-phone"></i>
                    </button>
                    <button className="control-button"><i className="fas fa-cog"></i></button>
                </div>
            </div>

            <div className="chat-section">
                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`message ${msg.sender === "me" ? "message-right" : "message-left"}`}
                        >
                            {msg.sender !== "me" && (
                                <i
                                    className="fas fa-user avatar"
                                    style={{
                                        marginTop: "18px",
                                        position: "relative",
                                        left: "20px",
                                    }}
                                ></i>
                            )}
                            <div
                            style={{  maxWidth: "70%",  // Giới hạn chiều rộng của tin nhắn
                                wordWrap: "break-word",  // Ngắt dòng khi từ quá dài
                                wordBreak: "break-word",  // Chia từ dài nếu cần
                                overflowWrap: "break-word",  // Hỗ trợ ngắt từ dài
                                marginBottom: "10px", }}
                            className="message-content">
                                <p>{msg.content}</p>
                                <span style={{ fontSize: "12px", color: "#ccd6dd" }}>{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chat-input">
                    <input
                        type="text"
                        placeholder="Write a message here"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                        }}
                    />
                    <button onClick={handleSendMessage}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>

            <ToastContainer />

            {/* Hộp thoại xác nhận */}
            <Dialog
                open={isConfirmingEndCall}
                onClose={() => setIsConfirmingEndCall(false)}
            >
                <DialogTitle style={{color:"#0fc6de"}} >Xác nhận kết thúc cuộc gọi</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn kết thúc cuộc gọi không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmingEndCall(false)} color="gray">
                        Hủy
                    </Button>
                    <Button style={{color:"white",background:"#0fc6de"}} onClick={handleEndCall}  variant="contained">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Schedule;
