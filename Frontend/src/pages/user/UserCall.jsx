import { useRef, useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, List, ListItem, ListItemText } from "@mui/material";
import './Usercall.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserCall = () => {
    const webcamRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [isConfirmingEndCall, setIsConfirmingEndCall] = useState(false);
    const [isUsersDialogOpen, setIsUsersDialogOpen] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState([
        { id: 1, name: "Ho Xuan Thanh" },
        { id: 2, name: "Nguyen Cong Phuong" },
        { id: 3, name: "Nguyen Quang Hai" },
        { id: 4, name: "Ho Tan Tai" }
    ]);
    const [webSocket, setWebSocket] = useState(null);

    useEffect(() => {
        // Webcam setup
        if (isCameraOn) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                    if (webcamRef.current) {
                        webcamRef.current.srcObject = stream;
                    }
                    // WebSocket connection
                    const ws = new WebSocket('ws://localhost:8080?userId=123a');
                    ws.onopen = () => {
                        console.log('WebSocket connection established.');
                        // Initialize WebSocket for sending video data
                        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
                        mediaRecorder.ondataavailable = (event) => {
                            if (event.data.size > 0) {
                                event.data.arrayBuffer().then((buffer) => {
                                    ws.send(JSON.stringify({ event: 'video_chunk', data: Array.from(new Uint8Array(buffer)) }));
                                    console.log(`Sent chunk of size: ${event.data.size}`);
                                });
                            }
                        };
                        mediaRecorder.start(500); // 0.5-second chunks
                    };
                    setWebSocket(ws);
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

        return () => {
            if (webSocket) {
                webSocket.close();
            }
        };
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
        setIsConfirmingEndCall(true);
    };

    const handleEndCall = () => {
        setIsCameraOn(false);
        toast.info("Cuộc gọi đã được kết thúc!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            icon: <i className="fas fa-phone" style={{ color: "#2e55af" }}></i>,
        });
        setIsConfirmingEndCall(false);
    };

    const openUsersDialog = () => {
        setIsUsersDialogOpen(true);
    };

    const closeUsersDialog = () => {
        setIsUsersDialogOpen(false);
    };

    return (
        <div className="container">
            <div className="video-call-section w-3/4">
                <div className="video-container" style={{ position: "relative" }}>
                    <div className="thumbnail" style={{ background: "#fafafa" }}>
                        {!isCameraOn ? (
                            <i
                                className="fas fa-user"
                                style={{
                                    color: "#102c57",
                                    fontSize: "190px",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 2,
                                }}
                            ></i>
                        ) : (
                            <video
                                className="main-video"
                                ref={webcamRef}
                                autoPlay
                                muted
                                style={{
                                    display: isCameraOn ? "block" : "none",
                                    width: "270px",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 2,
                                }}
                            ></video>
                        )}
                    </div>
                    <img
                        src="https://img.freepik.com/free-vector/man-headphone-avatar-call-center_18591-16552.jpg?size=338&ext=jpg"
                        alt="User Avatar"
                        style={{
                            width: "100%",
                            height: "100%",
                            marginLeft: "0px",
                            marginTop: "-210px",
                            position: "relative",
                            zIndex: 1,
                        }}
                    />
                </div>

                <div className="controls">
                    <button className="control-button" onClick={toggleCamera}>
                        <i className={`fas ${isCameraOn ? "fa-video" : "fa-video-slash"}`}></i>
                    </button>
                    <button className="control-button end-call" onClick={confirmEndCall}>
                        <i className="fas fa-phone"></i>
                    </button>
                    <button className="control-button" onClick={openUsersDialog}>
                        <i className="fas fa-user-friends"></i>
                    </button>
                </div>
            </div>

            <div className="chat-section w-1/4">
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
                                        color: "#102c57",
                                        marginLeft: "-12px",
                                    }}
                                ></i>
                            )}
                            <div
                                style={{
                                    maxWidth: "70%",
                                    wordWrap: "break-word",
                                    wordBreak: "break-word",
                                    overflowWrap: "break-word",
                                    marginBottom: "10px",
                                }}
                                className="message-content"
                            >
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

            {/* Dialog danh sách người dùng */}
            <Dialog open={isUsersDialogOpen} onClose={closeUsersDialog} maxWidth="xs" fullWidth>
                <DialogTitle style={{ color: "#0fc6de", marginLeft: "75px" }}>Người dùng đang online</DialogTitle>
                <DialogContent>
                    <List>
                        {onlineUsers.map((user) => (
                            <ListItem key={user.id}>
                                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                                    <i className="fas fa-user" style={{ fontSize: "30px", position: "relative", color: "#102c57" }}></i>
                                    <i className="fas fa-check-circle" style={{ color: "green", marginTop: "20px", fontSize: "12px" }}></i>
                                </div>
                                <ListItemText primary={user.name} style={{ marginLeft: "10px", marginTop: "25px" }} />
                                <i className="fas fa-phone" style={{ fontSize: "22px", color: "#4CAF50", marginTop: "11px" }}></i>
                                <i className="fa-brands fa-rocketchat" style={{ fontSize: "22px", color: "#1e70b8", marginLeft: "20px", marginTop: "11px" }}></i>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeUsersDialog} color="gray">Đóng</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isConfirmingEndCall} onClose={() => setIsConfirmingEndCall(false)}>
                <DialogTitle style={{ color: "#0fc6de" }}>Xác nhận kết thúc cuộc gọi</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn kết thúc cuộc gọi không?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsConfirmingEndCall(false)} color="gray">Hủy</Button>
                    <Button style={{ color: "white", background: "#0fc6de" }} onClick={handleEndCall} variant="contained">Xác nhận</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserCall;
