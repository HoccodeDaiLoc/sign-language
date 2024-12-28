import { useEffect, useState, useRef } from "react";
import leftArrow from "../../assets/svg/left-arrow-list.svg";
import rightArrow from "../../assets/svg/right-arrow-list.svg";
import Image from "../../components/common/Image";
import { useForm } from "react-hook-form";
import userServices from "../../api/userServices";
import { store } from "../../utils/store";
import "video.js/dist/video-js.css";
import videojs from "video.js";
import video from "../../assets/svg/video.svg"
import uploadvideo from "../../assets/svg/upload.svg"
import closeIcon from "../../assets/svg/close_icon.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Usercall.scss';
import Modal from "../../components/common/Modal.jsx";

import ToastUtil from "../../utils/notiUtils.js";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const UserUploadVideo = () => {
  const numberItemRender = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [listVideo, setListVideo] = useState([]);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState(null);
  const [captionUrl, setCaptionURL] = useState(""); // Store the caption data
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const user = store.getState().auth.user;
  const testapi = `https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=${numberItemRender}`;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoName, setSelectedVideoName] = useState(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      video: null,
    },
  });
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    const couting = async (currentPage) => {
      if (currentPage > 0) {
        setOffset((currentPage - 1) * numberItemRender);
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
        tracks: [
          {
            kind: 'subtitles',
            src: captionUrl,
            srclang: 'en',
            label: 'English'
          }
        ]
      });
      const mergeToVtt = async () => {
        const ffmpeg = createFFmpeg({ log: true });
        await ffmpeg.load();
        ffmpeg.FS("writeFile", "video.mp4", await fetchFile(uploadedVideoUrl));
        ffmpeg.FS("writeFile", "subtitles.vtt", await fetchFile(uploadedVideoUrl));
        await ffmpeg.run(
          "-i",
          "video.mp4",
          "-vf",
          "subtitles=subtitles.vtt",
          "output.mp4"
        );
        const data = ffmpeg.FS("readFile", "output.mp4");
        const videoBlob = new Blob([data.buffer], { type: "video/mp4" });
        const videoUrlWithSubtitles = URL.createObjectURL(videoBlob);
        setDownloadUrl(videoUrlWithSubtitles);
      }
      mergeToVtt()
      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [uploadedVideoUrl, captionUrl]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const onSubmit = async (data) => {
    if (data.video && data.video[0]) {
      const formData = new FormData();
      formData.append("video", data.video[0]);
      formData.append("userId", user._id);
      try {
        setLoading(true)
        setIsModalOpen(false)
        const result = await userServices.uploadVideo(formData);
        const txtLink = result.metadata.result;
        setCaptionURL(txtLink);
        setUploadedVideoUrl(result.metadata.url);
        ToastUtil.success("Đã xử lý xong video");
        setLoading(false)
      } catch (error) {
        ToastUtil.error("Upload video thất bại");

        console.error("Error uploading video:", error);
      }
    } else {
      console.error("No video selected");
    }
  };
  const removeUploadedVideo = () => {
    setUploadedVideoUrl(null);
    setCaptionURL(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video')) {
      setSelectedVideoName(file.name);
      setSelectedVideo(URL.createObjectURL(file));
    } else {
      console.error("Please select a valid video file.");
    }
  };
  return (
    <>
      <Modal component="videoupload" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white text-black rounded-2xl shadow-lg w-[60%] h-full sm:max-w-full md:max-w-[80%] mx-auto">
          <div className="flex flex-col justify-between items-center p-4 h-full">
            <div className="flex items-center justify-between w-full border-b border-gray-300 pb-4">
              <span className="text-xl">{selectedVideo ? selectedVideoName : 'Tải video lên'}</span>
              <img
                src={closeIcon}
                onClick={() => setIsModalOpen(false)}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
            {loading ? (
              <div className="flex flex-row items-center justify-center w-full h-full" >
                Đang xử lý video, xin chờ một lát
                <FontAwesomeIcon icon={faSpinner} spin className="text-xl via-blue-300 ml-4" />
              </div>
            ) : (
              selectedVideo ? (
                <div className="flex flex-col items-center justify-center w-full h-full">
                  <video
                    src={selectedVideo}
                    controls
                    className="w-[60%] h-[60%] object-contain rounded-md"
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                  >
                    Tải video lên
                  </button>
                  <button
                    onClick={() => setSelectedVideo(null)}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Chọn video khác
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mt-6 border-b border-gray-300 w-full h-full">
                  <img
                    src={uploadvideo}
                    className="w-32 h-32 cursor-pointer"
                    onClick={() => document.getElementById("video").click()}
                    alt="Upload Video"
                  />
                  <div className="mt-4 text-center">
                    <span className="block mb-2">Chọn tệp video để được xử lý</span>
                    <span className="block mb-4">Video sẽ được thêm subtitles cho ngôn ngữ ký hiệu</span>
                    <input
                      type="file"
                      id="video"
                      name="video"
                      accept="video/*"
                      {...register("video", {
                        onChange: (event) => {
                          handleFileChange(event);
                        },
                        required: "Vui lòng chọn một tệp video",
                        validate: {
                          isVideo: (fileList) => {
                            const file = fileList?.[0];
                            if (!file) return "Vui lòng tải lên một tệp";
                            const validVideoTypes = ["video/mp4", "video/avi", "video/mkv", "video/webm"];
                            return validVideoTypes.includes(file.type) || "Tệp phải là video hợp lệ (mp4, avi, mkv, webm)";
                          },
                        },
                      })}
                    />
                    {errors.video && <p className="text-sm text-red-500">{errors.video.message}</p>}
                  </div>

                </div>
              )
            )}
            {!selectedVideo && (
              <div className="mt-auto text-sm text-center pt-4">
                <span>Chúng tôi sẽ cố gắng xử lý video nhanh nhất có thể</span>
              </div>
            )}

          </div>
        </form>
      </Modal>


      <div className="flex h-full">

        <div className="w-1/4 bg-gray-100 p-6 overflow-y-auto flex flex-col items-center">
          <div className="w-full flex flex-row justify-between mb-6">
            <h2 className="text-xl font-semibold">Videos</h2>
          </div>
          <div className="w-full space-y-2">
            {listVideo.map((video, index) => (
              <div
                key={index}
                className="p-3 bg-white rounded shadow-md hover:bg-gray-50 transition duration-200"
              >
                <span>{video.name}</span>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center justify-between mt-6 p-2 bg-slate-100 border-solid border-slate-200 rounded-[15px]">
            <div
              className="hover:cursor-pointer"
              onClick={handlePreviousPage}
            >
              <Image size="32px" imgsrc={leftArrow} imgAlt="leftArrow" />
            </div>
            <p className="text-xl">Trang {currentPage}</p>
            <div
              className="hover:cursor-pointer"
              onClick={handleNextPage}
            >
              <Image size="32px" imgsrc={rightArrow} imgAlt="rightArrow" />
            </div>
          </div>
        </div>

        <div className="w-3/4 p-6">
          <div className="bg-white p-6 rounded-lg shadow-md h-[80vh] flex flex-col justify-center items-center">
            {loading ? (
              <div className="flex justify-center items-center w-full h-full">
                Đang xử lý video, xin chờ một lát
                <FontAwesomeIcon icon={faSpinner} spin className="text-xl via-blue-300 ml-4" />
              </div>
            ) :
              uploadedVideoUrl ? (
                <>
                  <div className="mt-4 flex flex-row items-center justify-between w-full">
                    <button
                      type="button"
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                      onClick={removeUploadedVideo}
                    >
                      Hãy thử với video khác
                    </button>
                    <a
                      href={downloadUrl}
                      download="video_with_subtitles.mp4"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                      Tải video xuống
                    </a>
                  </div>
                  <div className="flex flex-col justify-center items-center mt-6 w-full h-full">
                    <div className=" w-2/3 h-2/3">
                      <video
                        ref={videoPlayerRef}
                        className="video-js vjs-default-skin vjs-16-9"
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

                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-center border border-dashed rounded-md border-black w-full h-full p-6">
                    <div className="">
                      <h1 className="text-4xl font-bold text-gray-900">Video của bạn sẽ được nhận </h1>
                    </div>
                    <div className="mb-4">
                      <img src={video} alt="video-placeholder" className="w-60 h-60" />
                    </div>
                    <div className="text-lg text-center mb-4">
                      <span>
                        Hãy đăng tải video lên để nhận lại video mới đã được thêm
                        subtitles với Ngôn Ngữ Kí Hiệu
                      </span>
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4">
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Tải video lên
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
        </div>

      </div>
    </>
  );
}
export default UserUploadVideo;
