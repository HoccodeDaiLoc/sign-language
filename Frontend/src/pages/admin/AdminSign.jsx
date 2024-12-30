import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "video.js/dist/video-js.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/common/Modal.jsx";
import ToastUtil from "../../utils/notiUtils.js";
import adminServices from "../../api/adminServices.js";
import SearchBarTransition from "../../components/common/SearchBarTransition.jsx";
import { useNavigate } from "react-router-dom";

const AdminSign = () => {
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const result = await adminServices.getAllSign();
                setVideos(result.response.data.metadata);
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };

        fetchVideos();
    }, []);
    const handleDelete = async (data) => {
        console.log(data)
        try {
            setLoading(true);
            const response = await adminServices.deleteSignById(data);
            if (response.success) {
                ToastUtil.success("Xóa thành công");

            } const updatedVideos = await adminServices.getAllSign();
            setVideos(updatedVideos.response.data.metadata);
            reset();
            setIsModalOpen(false);
        } catch (error) {
            ToastUtil.error("Xử lý video thất bại");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }
    const handleUpdate = async (data) => {
        console.log(data)
        try {
            setLoading(true);
            const response = await adminServices.Update(data);
            if (response.success) {
                ToastUtil.success("Cập nhật thành công");

            } const updatedVideos = await adminServices.getAllSign();
            setVideos(updatedVideos.response.data.metadata);
            reset();
            setIsModalOpen(false);
        } catch (error) {
            ToastUtil.error("Xử lý video thất bại");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("video", data.video[0]);
        formData.append("name", data.name);
        formData.append("howtoperform", data.howtoperform);
        try {
            setLoading(true);
            const response = await adminServices.addSign(formData);
            if (response.success) {
                ToastUtil.success("Thêm video thành công");

            }
            const updatedVideos = await adminServices.getAllSign();
            setVideos(updatedVideos.response.data.metadata);
            reset();
            setIsModalOpen(false);
        } catch (error) {
            ToastUtil.error("Xử lý video thất bại");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-grow p-6 bg-gray-100">

                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Danh sách Video</h1>

                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={() => {
                            reset();
                            setIsModalOpen(true);
                        }}
                    >
                        Thêm Video
                    </button>
                </div>
                <div>
                    <div className="my-4">
                        <SearchBarTransition search="sign" size="1/4"></SearchBarTransition>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {videos && Array.isArray(videos) && videos.map((video) => (
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                navigate("/admin/searchresult", {
                                    state: { itemName: video.name }
                                });
                            }}
                            key={video._id}
                            className="p-4 bg-white shadow rounded-lg flex flex-col items-center"
                        >
                            <p
                                className="text-lg text-black truncate w-full text-center overflow-hidden text-ellipsis whitespace-nowrap pb-3"
                            >
                                {video.name}
                            </p>
                            <video
                                src={video.videoUrl}
                                controls
                                className="w-full h-40 object-contain rounded-md mb-4"
                            />
                            <p
                                className="text-sm text-gray-600 w-full"
                            >
                                {video.howtoperform}
                            </p>
                            <div
                                style={{ marginTop: "auto" }}
                                className="flex flex-row justify-between w-full">
                                <button
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                    onClick={() => {
                                        console.log(video);
                                        handleDelete(video._id)
                                    }}
                                >
                                    Xóa
                                </button>
                                <button
                                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                                    onClick={() => {
                                        console.log(video);
                                        handleUpdate(video._id)
                                    }}
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="p-6 bg-white rounded-lg shadow-lg"
                    >
                        <h2 className="text-xl font-semibold mb-4">Thêm Video</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Video</label>
                            <input
                                type="file"
                                accept="video/*"
                                {...register("video", { required: "Vui lòng tải lên video" })}
                            />
                            {errors.video && (
                                <p className="text-red-500 text-sm mt-1">{errors.video.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Tên kí hiệu</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                {...register("name", { required: "Vui lòng nhập tên kí hiệu" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Hướng dẫn</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-md"
                                {...register("howtoperform", { required: "Vui lòng nhập hướng dẫn" })}
                            />
                            {errors.howtoperform && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.howtoperform.message}
                                </p>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Lưu"}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default AdminSign;
