import { useEffect, useRef } from "react";
import videojs from "video.js";

const useVideoPlayer = (videoSrc, trackSrc) => {
    const videoPlayerRef = useRef(null);

    useEffect(() => {
        let player;
        if (videoPlayerRef.current && videoSrc) {
            player = videojs(videoPlayerRef.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                fluid: true,
                sources: [{ src: videoSrc, type: "video/mp4" }],
                tracks: trackSrc
                    ? [
                        {
                            kind: "subtitles",
                            src: trackSrc,
                            srclang: "en",
                            label: "English",
                            default: true,
                        },
                    ]
                    : [],
            });
        }

        return () => {
            if (player) {
                player.dispose();
            }
        };
    }, [videoSrc, trackSrc]);

    return videoPlayerRef;
};

export default useVideoPlayer;
