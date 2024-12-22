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

    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            username: currentUser.username,
            email: currentUser.email,
            avatar:currentUser.avatar,
        },
    });


    const avatarFile = watch("avatar");
    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log("Dữ liệu người dùng:", data);
    
        const avatar = data.avatar && data.avatar.length > 0 ? data.avatar[0] : null;
    
        if (avatar) {
            try {
                const avatarFormData = new FormData();
                avatarFormData.append("avatar", avatar);
    
                const avatarResult = await userServices.changeAvatar(currentUser._id, avatarFormData, currentUser.token);
                console.log("Kết quả đổi avatar:", avatarResult);
    
                if (avatarResult.success) {
                    ToastUtil.success("Đổi avatar thành công");
                    setAvatarPreview(URL.createObjectURL(avatar));
                } else {
                    throw new Error(avatarResult.error || "Có lỗi xảy ra khi đổi avatar");
                }
            } catch (error) {
                console.error("Lỗi khi đổi avatar:", error);
                ToastUtil.error(error.message);
            }
            console.log("Avatar API Response:", avatarResult);
            console.log("Update API Response:", updateResult);
            
        }
    
        try {
            const formData = new FormData();
            formData.append("username", data.username);
            formData.append("email", data.email);
    
            const updateResult = await userServices.updateUser(currentUser._id, formData, currentUser.token);
            console.log("Kết quả cập nhật người dùng:", updateResult);
    
            if (updateResult.success) {
                ToastUtil.success("Lưu thông tin thành công");
            } else {
                throw new Error(updateResult.error || "Có lỗi xảy ra khi cập nhật thông tin");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật thông tin:", error);
            ToastUtil.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setAvatarPreview(URL.createObjectURL(file));
            console.log("Dữ liệu file đã chọn:", file);
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
                            style={{ backgroundColor: "#808080" ,fontSize:"10px",height:"30px"}}
                           
                        >
                            Chọn ảnh
                        </label>
                        <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            {...register("avatar")}
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
                    className={ `btn-submit btn block mt-12 ml-auto mr-40 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                    style={{marginLeft:"525px",marginBottom:"200px"}}
                >
                    {isLoading ? "Đang xử lý..." : "Lưu thông tin"}
                </button>
                {errMsg && <p className="error-message text-red-500">{errMsg}</p>}
            </form>
        </Wrapper>
    );
}

export default UserProfile;
