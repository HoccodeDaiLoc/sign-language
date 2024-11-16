import React, { useRef, useEffect } from "react";
import "./Schedule.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Schedule = () => {

    const webcamRef = useRef(null); 

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                console.log("Webcam stream: ", stream);  // Thêm dòng này để kiểm tra stream
                if (webcamRef.current) {
                    webcamRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                console.error("Error accessing webcam: ", err); 
            });
    }, []);

    return (
        <div className="container">
            <div className="video-call-section">
                <div className="video-container">
                    {/* Video chính (webcam) */}
                    <video 
                        className="main-video" 
                        ref={webcamRef} 
                        autoPlay 
                        muted 
                    ></video>

                    {/* Thumbnails khác */}
                    <div className="participants">
                        <div className="thumbnail">
                            <i 
                                className="fas fa-user" 
                                style={{
                                    color: "#67aaad",  
                                    fontSize: "110px",    
                                    marginLeft: "30px",
                                    marginTop: "10px"
                                }}
                            ></i>
                        </div>
                    </div>
                </div>
                <div className="controls">
                    <button className="control-button"><i className="fas fa-upload"></i></button>
                    <button className="control-button"><i className="fas fa-video"></i></button>
                    <button className="control-button end-call"><i className="fas fa-phone"></i></button>
                    <button className="control-button"><i className="fas fa-microphone"></i></button>
                    <button className="control-button"><i className="fas fa-cog"></i></button>
                </div>
            </div>

            <div className="chat-section">
                <div className="chat-messages">
                    <div className="message message-left" style={{
                        marginLeft: "-20px"
                    }}>
                        <i
                            className="fas fa-user avatar"
                            style={{
                                marginTop: "18px", 
                                position: "relative", 
                                left: "20px" 
                            }}
                        ></i>
                        <div className="message-content">
                            <p>Hello! Ho Xuan Thanh</p>
                            <span>10:00 AM</span>
                        </div>
                    </div>

                    <div className="message message-right">
                        <div className="message-content">
                            <p>Chơi game không</p>
                            <span>10:02 AM</span>
                        </div>
                    </div>

                    <div className="message message-left" style={{
                        marginLeft: "-20px"
                    }}>
                        <i
                            className="fas fa-user avatar"
                            style={{
                                marginTop: "18px",
                                position: "relative",
                                left: "20px"
                            }}
                        ></i>
                        <div className="message-content">
                            <p>Dô</p>
                            <span>10:05 AM</span>
                        </div>
                    </div>

                    <div className="message message-right">
                        <div className="message-content">
                            <p>Ai sơ thi di về.</p>
                            <span>10:08 AM</span>
                        </div>
                    </div>
                </div>

                <div className="chat-input">
                    <input type="text" placeholder="Write a message here" />
                    <button><i className="fas fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Schedule;
