import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from 'react';
import { useForm } from "react-hook-form";
import userServices from '../../api/userServices'
import userAvatar from '../../components/user/userAvatar'
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authSlice";
import ToastUtil from "../../utils/notiUtils";
import FormField from "../../components/common/FormField";

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
            {/* <userAvatar imgsize={imgsize}></userAvatar> */}
            <form className="form" onSubmit={handleSubmit(onSubmit)} >
                <h3 style={{ marginLeft: "450px", fontSize: "30px", marginBottom: '20px' }}>Thông tin cá nhân</h3> <br />
                <FormField
                    label="Họ và tên:"
                    name="username"
                    defaultValue={currentUser.username}
                    register={register}
                    errors={errors}
                />
                <FormField
                    label="Email"
                    name="email"
                    defaultValue={currentUser.email}
                    register={register}
                    errors={errors}
                />
                <button type="submit" className="btn-submit btn" disabled={isLoading} style={{ marginLeft: "515px", marginTop: "50px", marginBottom: "276px    " }}>
                    {isLoading ? "Đang xử lý..." : "Lưu thông tin"}
                </button>
                {errMsg && <p className="error-message">{errMsg}</p>}
            </form>
        </Wrapper >
    )
}
export default UserProfile;