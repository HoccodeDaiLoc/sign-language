import React, { useRef, useEffect } from "react";
import videojs from "video.js"; // Thư viện Video.js
import "video.js/dist/video-js.css"; // CSS mặc định của Video.js
import "@videojs/themes/dist/forest/index.css"; // Tùy chọn thêm theme Video.js

const VideoPlayer = ({ options }) => {
    const videoRef = useRef(null); // Tham chiếu DOM cho video element
    const playerRef = useRef(null); // Tham chiếu player của Video.js

    useEffect(() => {
        // Khởi tạo Video.js player
        if (videoRef.current && !playerRef.current) {
            playerRef.current = videojs(videoRef.current, options, () => {
                console.log("Video.js player is ready!");
            });
        }

        return () => {
            // Hủy player khi component bị unmount
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [options]);

    return (
        <div data-vjs-player>
            <video
                ref={videoRef}
                className="video-js vjs-theme-forest" // Theme mặc định
            />
        </div>
    );
};

const App = () => {
    const videoJsOptions = {
        controls: true,
        autoplay: false,
        preload: "auto",
        responsive: true,
        fluid: true,
        sources: [
            {
                src: "https://vjs.zencdn.net/v/oceans.mp4", // Đường dẫn đến file video
                type: "video/mp4",
            },
        ],
    };

    return (
        <div>
            <h1>React Video.js Example</h1>
            <VideoPlayer options={videoJsOptions} />
        </div>
    );
};

export default App;
