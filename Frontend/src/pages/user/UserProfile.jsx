import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from "react";
import { useForm } from "react-hook-form";
import userServices from "../../api/userServices";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, updateUserInfo } from "../../features/authSlice";
import ToastUtil from "../../utils/notiUtils";
import FormField from "../../components/common/FormField";

function UserProfile() {
    const dispatch = useDispatch();
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
            const avatar = data.avatar && data.avatar.length > 0 ? data.avatar[0] : null;
            if (avatar) {

                const avatarFormData = new FormData();
                avatarFormData.append("file", avatar);

                const avatarResult = await userServices.changeAvatar(
                    currentUser._id,
                    avatarFormData,
                    currentUser.token
                );

                if (avatarResult.success) {
                    ToastUtil.success("Đổi avatar thành công");
                    setAvatarPreview(URL.createObjectURL(avatar));
                } else {
                    throw new Error(avatarResult.error || "Có lỗi xảy ra khi đổi avatar");
                }
            }

            dispatch(updateUserInfo({
                username: data.username,
                email: data.email,
            }));

            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);

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
                        >
                            Chọn ảnh
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            {...register("avatar")}
                            onChange={handleAvatarChange}
                        />
                    </div>
                </div>

                <FormField
                    label="Họ và tên:"
                    name="username"
                    register={register}
                    errors={errors}
                />

                <div className="flex items-center space-x-2 mb-4">
                    <label className="form-label text-sm font-medium text-gray-700" style={{ fontSize: "18px", marginLeft: "255px", marginTop: "19px" }}>Email:</label>
                    <input
                        style={{ fontSize: "17px", width: "500px", height: "35px", marginLeft: "48px" }}
                        type="text"
                        value={currentUser.email}
                        readOnly
                        className="form-input bg-gray-100 cursor-not-allowed border border-gray-300 rounded-md px-3 py-1 text-sm"
                    />
                </div>

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
