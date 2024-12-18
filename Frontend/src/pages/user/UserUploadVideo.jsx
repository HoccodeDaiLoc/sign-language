import { useEffect, useState, useRef } from "react";
import leftArrow from "../../assets/svg/left-arrow-list.svg";
import rightArrow from "../../assets/svg/right-arrow-list.svg";
import Image from "../../components/common/Image";
import { useForm } from "react-hook-form";
import userServices from "../../api/userServices";
import { store } from "../../utils/store";
import "video.js/dist/video-js.css";
import videojs from "video.js";

const UserUploadVideo = () => {
  const numberItemRender = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [listVideo, setListVideo] = useState([]);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);
  const [captionUrl, setCaptionURL] = useState(""); // Store the caption data
  const [offset, setOffset] = useState(0);
  const user = store.getState().auth.user;
  const testapi = `https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=${numberItemRender}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const videoPlayerRef = useRef(null); // Reference for Video.js player

  useEffect(() => {
    const couting = async (currentPage) => {
      if (currentPage > 0) {
        setOffset((currentPage - 1) * numberItemRender); // Adjust offset calculation
      }
    };
    couting(currentPage);

    const getData = async () => {
      const response = await fetch(testapi);
      const result = await response.json();
      setListVideo(result.results);
    };
    getData();
  }, [currentPage]);

  useEffect(() => {
    if (videoPlayerRef.current && uploadedVideoUrl) {
      const player = videojs(videoPlayerRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
        fluid: true,
        sources: [{ src: uploadedVideoUrl, type: "video/mp4" }],
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [uploadedVideoUrl]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const onSubmit = async (data) => {
    console.log("cc");
    console.log("Form Data:", data); // Log to check form data

    if (data.videoUpload && data.videoUpload[0]) {
      const formData = new FormData();
      formData.append("video", data.videoUpload[0]);
      formData.append("userId", user._id);

      try {
        const result = await userServices.uploadVideo(formData);
        console.log("Video URL:", result.metadata.url);
        const txtLink = result.metadata.result;
        setCaptionURL(txtLink);
        setUploadedVideoUrl(result.metadata.url);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    } else {
      console.error("No video selected");
    }
  };
  const removeUploadedVideo = () => {
    setUploadedVideoUrl(null); // Xóa URL của video
    setCaptionURL(null); // Xóa URL của caption

  };

  return (
    <>
      <div className="flex h-[100vh]">
        <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto flex flex-col items-center">
          <div className="w-[100%] flex flex-row justify-between">
            <h2 className="text-xl font-semibold mb-4">Videos</h2>
          </div>
          <div className="w-[100%]">
            {listVideo.map((video, index) => (
              <div
                key={index}
                className="mb-2 p-2 bg-white rounded shadow-md hover:bg-gray-50"
              >
                <span>{video.name}</span>
              </div>
            ))}
          </div>

          <div className="w-[100%] flex flex-row items-center justify-between m-4 p-2 bg-slate-100  border-solid border-slate-200 rounded-[15px]">
            <div
              className="hover:cursor-pointer h-[100%]"
              onClick={handlePreviousPage}
            >
              <Image size={"32px"} imgsrc={leftArrow} imgAlt={"leftArrow"} />
            </div>
            <div>
              <p className="text-xl">Trang {currentPage}</p>
            </div>
            <div
              className="hover:cursor-pointer h-[100%]"
              onClick={handleNextPage}
            >
              <Image size={"32px"} imgsrc={rightArrow} imgAlt={"rightArrow"} />
            </div>
          </div>
        </div>

        <div className="w-3/4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md h-[80vh]">
            {uploadedVideoUrl ? (
              <div className="flex flex-col justify-center items-center">
                <div className="mt-4">
                  <button
                    type="button"
                    style={{
                      padding: "10px",
                      backgroundColor: "red",
                      color: "white",
                      borderRadius: "5px",
                      display: "block",  // Ensure it is displayed
                      marginTop: "20px"  // Make sure it has space around it
                    }}
                    onClick={() => { removeUploadedVideo() }}
                  >
                    Xóa video
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center h-[80%] w-[80%]">

                  <video
                    ref={videoPlayerRef}
                    className="video-js vjs-default-skin vjs-16-9"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                    controls
                    preload="auto"
                    src={uploadedVideoUrl}
                  />
                  <track
                    kind="subtitles"
                    src={captionUrl}
                    srcLang="en"
                    label="English"
                    default
                  />
                </div>

              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    accept="video/*"
                    className="w-full p-2 border border-gray-300 rounded-md hidden"
                    {...register("videoUpload", { required: true })}
                  />
                </div>
                <button
                  type="button"
                  className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                  onClick={() => document.getElementById("video").click()}
                >
                  Chọn video
                </button>
                {errors.videoUpload && (
                  <p className="text-red-500 text-sm mt-2">
                    Vui lòng chọn video
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition duration-200 mt-4"
                >
                  Upload
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default UserUploadVideo;
