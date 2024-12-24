import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import userServices from "../../api/userServices";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import ToastUtil from "../../utils/notiUtils";
import FormField from "../../components/common/FormField";

function UserProfile() {
    const currentUser = useSelector(selectCurrentUser);
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [avatarPreview, setAvatarPreview] = useState(currentUser.avatar || null);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            username: currentUser.username,
            email: currentUser.email,
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrMsg("");

        try {
            // Kiểm tra và lấy file từ FileList
            const avatar = data.avatar && data.avatar.length > 0 ? data.avatar[0] : null;
            console.log("anhr gui len data:", data.avatar);
            if (avatar) {

                const avatarFormData = new FormData();
                avatarFormData.append("file", avatar);

                console.log("Dữ liệu avatar FormData:", avatarFormData);


                const avatarResult = await userServices.changeAvatar(
                    currentUser._id,
                    avatarFormData,
                    currentUser.token
                );

                console.log("Kết quả API đổi avatar:", avatarResult);

                if (avatarResult.success) {
                    ToastUtil.success("Đổi avatar thành công");
                    setAvatarPreview(URL.createObjectURL(avatar));
                } else {
                    throw new Error(avatarResult.error || "Có lỗi xảy ra khi đổi avatar");
                }

            }

            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);
            console.log("Dữ liệu gửi lên updateUser:", formData);

            const updateResult = await userServices.updateUser(
                currentUser._id,
                formData,
                currentUser.token
            );

            if (updateResult.success) {
                ToastUtil.success("Lưu thông tin thành công");
            } else {
                throw new Error(updateResult.error || "Có lỗi xảy ra khi cập nhật thông tin");
            }
        } catch (error) {
            console.error("Lỗi khi xử lý:", error);
            ToastUtil.error(error.message || "Đã xảy ra lỗi không xác định");
            setErrMsg(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            setValue("avatar", file); // Cập nhật file vào trong form
            console.log("Dữ liệu file đã chọn:", file);
            setValue("avatar", file); // Update form state with the file
        } else {
            console.log("Không có tệp tin avatar được chọn.");
        }
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="text-center text-2xl mb-5">Thông tin cá nhân</h3>
                <div className="flex flex-col items-center mb-5">
                    <img
                        src={avatarPreview || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-20 h-20 rounded-full object-cover mb-2"

                    />
                    <div>
                        <label
                            htmlFor="avatar"
                            className="btn text-sm px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
                            style={{ backgroundColor: "#808080", fontSize: "10px", height: "30px" }}

                        >
                            Chọn ảnh
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            {...register("data.avatar")}
                            onChange={handleAvatarChange}
                            className="hidden"
                        />
                    </div>
                </div>

                <FormField
                    label="Họ và tên:"
                    name="username"
                    register={register}
                    errors={errors}
                />
                <FormField
                    label="Email"
                    name="email"
                    register={register}
                    errors={errors}
                />
                <button
                    type="submit"
                    className={`btn-submit btn block mt-12 ml-auto mr-40 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{ marginLeft: "525px", marginBottom: "200px" }}
                >
                    {isLoading ? "Đang xử lý..." : "Lưu thông tin"}
                </button>
                {errMsg && <p className="error-message text-red-500">{errMsg}</p>}
            </form>
        </Wrapper>
    );
}

export default UserProfile;
