import React, { useEffect, useRef, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const AdminVideoItem = React.forwardRef(({ video, onClick }, ref) => {
    const videoPlayerRef = useRef(null);
    const playerInstanceRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        if (isMounted && videoPlayerRef.current) {
            if (playerInstanceRef.current) {
                playerInstanceRef.current.dispose();
            }

            playerInstanceRef.current = videojs(videoPlayerRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                fluid: true,
                sources: [{ src: video.videoUrl, type: "video/mp4" }],
            });

            console.log("Player initialized with video URL:", video.videoUrl);
            return () => {
                if (playerInstanceRef.current) {
                    playerInstanceRef.current.dispose();
                    playerInstanceRef.current = null;
                    console.log("Player disposed.");
                }
            };
        }
    }, [video.videoUrl, isMounted]);

    useEffect(() => {
        console.log(video);
    }, [video]);

    return (
        <div
            ref={ref}
            className="border rounded-lg p-4 shadow-lg w-full flex flex-col items-start space-y-2"
            onClick={() => onClick(video)}
        >
            <h3 className="text-xl font-bold">{video.name}</h3>
            <p className="text-gray-600">{video.howtoperform || "No description available."}</p>

            <div data-vjs-player className="w-full">
                <video
                    ref={videoPlayerRef}
                    className="video-js vjs-default-skin vjs-16-9"
                    controls
                    preload="auto"
                >
                    <source src={video.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
});

AdminVideoItem.displayName = "AdminVideoItem";

export default AdminVideoItem;
