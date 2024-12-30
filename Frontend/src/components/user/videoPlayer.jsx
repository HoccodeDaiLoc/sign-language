import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ videoSource, subtitlesSource }) => {
    const videoPlayerRef = useRef(null);
    const playerRef = useRef(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (videoPlayerRef.current) {
                playerRef.current = videojs(videoPlayerRef.current, {
                    controls: false,
                    autoplay: false,
                    preload: "auto",
                    fluid: true,
                    bigPlayButton: false,
                    sources: [{ src: videoSource, type: "video/mp4" }],
                    tracks: [
                        {
                            kind: "subtitles",
                            src: subtitlesSource,
                            srclang: "en",
                            label: "English",
                        },
                    ],
                });

                playerRef.current.on("play", () => {
                    playerRef.current.pause();
                });
            }
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            if (playerRef.current) {
                playerRef.current.dispose();
            }
        };
    }, [videoSource, subtitlesSource]);

    return (
        <div>
            <video
                ref={videoPlayerRef}
                className="video-js vjs-default-skin w-32 h-32 shadow-lg rounded-2xl"
            ></video>
        </div>
    );
};

export default VideoPlayer;
