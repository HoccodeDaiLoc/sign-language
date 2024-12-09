import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import userServices from '../../api/userServices'
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import ToastUtil from "../../utils/notiUtils";

function UserProfile() {
    const currentUser = useSelector(selectCurrentUser);
    const [errMsg, setErrMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, } = useForm();
    console.log("user", currentUser)
    const onSubmit = async (id) => {
        setIsLoading(true);
        const result = await userServices.updateUser(id);
        console.log(result);
        setIsLoading(false);
        if (result.success) {
            ToastUtil.success("Lưu thông tin thành công");
        } else {
            ToastUtil.error("Có lỗi đã xảy ra");
            setErrMsg(result.error);
        }
    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit(onSubmit)} >
                <h3 style={{ marginLeft: "300px" }}> Thông tin cá nhân</h3> <br />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input
                        className="form-input p-3"
                        placeholder="username"
                        {...register("username", { required: "UserName is required" })}
                    />
                    {errors.username && <p className="error-message">{errors.email.message}</p>}
                </div>
                <div className="form-row">
                    <input
                        className="form-input p-3"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div>
                {/* <div className="form-row">
                    <input
                        className="form-input p-3"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div> */}
                <button type="submit" className="btn-submit btn" disabled={isLoading}>
                    {isLoading ? "Đang xử lý..." : "Lưu thông tin"}
                </button>
                {errMsg && <p className="error-message">{errMsg}</p>}

            </form>
        </Wrapper >
    )
}
export default UserProfile;