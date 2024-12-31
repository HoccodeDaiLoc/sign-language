import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import adminServices from "../../api/adminServices";
import videojs from "video.js";
import BackButton from "../../components/common/BackButton";

const AdminSearchResult = () => {
    const location = useLocation();
    const itemName = location.state?.itemName;
    const [item, setItem] = useState(null);
    const videoPlayerRef1 = useRef(null);
    const playerInstanceRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => {
            setIsMounted(false);
        };
    }, [itemName]);

    useEffect(() => {
        const getItem = async (itemName) => {
            try {
                const result = await adminServices.getSign(itemName);
                if (result.response?.data?.metadata?.length > 0) {
                    setItem(result.response.data.metadata[0]);
                } else {
                    setItem(null);
                }
            } catch (error) {
                console.error("Error fetching item:", error);
                setItem(null);
            }
        };
        if (itemName) {
            getItem(itemName);
        }
    }, [itemName]);

    useEffect(() => {
        if (isMounted && item?.videoUrl && videoPlayerRef1.current) {
            if (playerInstanceRef.current) {
                playerInstanceRef.current.dispose();
                playerInstanceRef.current = null;
            }

            playerInstanceRef.current = videojs(videoPlayerRef1.current, {
                controls: true,
                autoplay: false,
                preload: "auto",
                fluid: true,
                sources: [{ src: item.videoUrl, type: "video/mp4" }],
            });

            playerInstanceRef.current.on("ready", () => {
                console.log("Video ready to play");
            });

            playerInstanceRef.current.on("error", () => {
                console.error("Error loading video");
            });

            return () => {
                if (playerInstanceRef.current) {
                    playerInstanceRef.current.dispose();
                    playerInstanceRef.current = null;
                }
            };
        }
    }, [item?.videoUrl, isMounted]);

    if (!item) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-start items-start px-8 py-8">

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl flex flex-row gap-12">
                <BackButton></BackButton>

                <div className="w-3/4">
                    <div data-vjs-player>
                        <video
                            ref={videoPlayerRef1}
                            className="video-js vjs-default-skin vjs-16-9"
                            controls
                            preload="auto"
                        />
                    </div>
                </div>
                <div className="w-1/4 flex flex-col justify-start">
                    <h1 className="text-4xl font-bold mb-6" style={{ color: '#67aaad' }}>
                        ký hiệu: {item.name}
                    </h1>
                    <p className="text-lg leading-7">
                        {item.howtoperform}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminSearchResult;
