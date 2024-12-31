import { useRef, useState, useCallback } from "react";
import UseHistory from "../../hooks/UseHistory";
import VideoItem from "./VideoItem";

const VideoItemResults = ({ onSelectVideo, refresh }) => {
    const [pageNum, setPageNum] = useState(1);
    const { isLoading, isError, error, results, hasNextPage } = UseHistory(pageNum, refresh);

    const firstItemRef = useRef();
    const intObserver = useRef();

    const lastHistoryRef = useCallback(
        (video) => {
            if (isLoading) return;
            if (intObserver.current) {
                intObserver.current.disconnect();
            }
            intObserver.current = new IntersectionObserver((videos) => {
                if (videos[0].isIntersecting && hasNextPage) {
                    console.log("near the last post");
                    setPageNum((prev) => prev + 1);
                }
            });
            if (video) intObserver.current.observe(video);
        },
        [isLoading, hasNextPage]
    );

    const scrollToTop = () => {
        if (firstItemRef.current) {
            firstItemRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (isError) {
        return <p className="text-center">Error : {error.message}</p>;
    }
    return (
        <div className="flex flex-col justify-center items-start overflow-y-hidden w-full">
            {isLoading && <p>Đang tải lịch sử</p>}
            <div className="flex flex-col items-center space-y-4 w-full">
                {results.map((video, i) => {
                    if (i === 0) {
                        return <VideoItem ref={firstItemRef} key={i} video={video} onClick={onSelectVideo} />;
                    }
                    if (results.length === i + 1) {
                        return <VideoItem ref={lastHistoryRef} key={i} video={video} onClick={onSelectVideo} />;
                    }
                    return (
                        <VideoItem video={video} key={i} onClick={onSelectVideo} />
                    );
                })}
                <p>
                    <button
                        onClick={scrollToTop}
                        className="text-blue-500 underline hover:text-blue-700"
                    >
                        Trở về đầu trang
                    </button>
                </p>
            </div>
        </div>
    );
};

export default VideoItemResults;
