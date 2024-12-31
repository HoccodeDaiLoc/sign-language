import React, { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import PostTimeAgo from "./PostTimeAgo";

const VideoItem = React.forwardRef(({ video, onClick }, ref) => {
  const videoPlayerRef = useRef(null);
  const playerRef = useRef(null);
  let previewInterval = null;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (videoPlayerRef.current) {
        playerRef.current = videojs(videoPlayerRef.current, {
          controls: false,
          autoplay: false,
          preload: "auto",
          fluid: true,
          bigPlayButton: false,

          sources: [{ src: video.videoName, type: "video/mp4" }],
          tracks: [
            {
              kind: "subtitles",
              src: video.result,
              srclang: "en",
              label: "English",
            },
          ],
        });

        playerRef.current.on("play", () => {
          playerRef.current.pause();
        });

        videoPlayerRef.current.addEventListener("click", (event) => {
          onClick(video);
          event.preventDefault();
          event.stopPropagation();
        });
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      if (playerRef.current) {
        playerRef.current.dispose();
      }
      if (previewInterval) {
        clearInterval(previewInterval);
      }
    };
  }, [video.videoName, video.result]);

  const handleMouseEnter = () => {
    if (videoPlayerRef.current) {
      const videoElement = videoPlayerRef.current;
      videoElement.muted = true;
      videoElement.currentTime = 0;

      previewInterval = setInterval(() => {
        if (videoElement.currentTime < videoElement.duration) {
          videoElement.currentTime += 1 / 30;
        } else {
          videoElement.currentTime = 0;
        }
      }, 50);
    }
  };

  const handleMouseLeave = () => {
    if (videoPlayerRef.current) {
      const videoElement = videoPlayerRef.current;
      clearInterval(previewInterval);
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  return (
    <article ref={ref}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="mb-3 cursor-pointer"
      >
        <video
          ref={videoPlayerRef}
          className="video-js vjs-default-skin w-32 h-32 shadow-lg rounded-2xl"
        ></video>
      </div>
      <span className="mt-3">
        Thời gian đăng :
        <PostTimeAgo postTime={video.createdAt}></PostTimeAgo>
      </span>
    </article>
  );
});

VideoItem.displayName = "VideoItem";

export default VideoItem;
