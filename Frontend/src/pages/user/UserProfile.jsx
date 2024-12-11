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
                <h3 style={{ marginLeft: "450px", fontSize: "30px", marginBottom: '20px' }}>Thông tin cá nhân</h3> <br />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '100px', marginLeft: '250px' }}>
                    <label style={{ fontSize: "18px", width: '100px', marginTop: "6px", marginRight: "-15px" }}>Họ và tên:</label>
                    <input
                        style={{ width: '500px' }}
                        className="form-input p-3"
                        placeholder="Ho Xuan Thanh"
                        {...register("username", { required: "UserName is required" })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '100px', marginLeft: '250px' }}>
                    <label style={{ fontSize: "18px", width: '100px', marginTop: "35px", marginRight: "-15px" }}>Địa chỉ:</label>
                    <input
                        style={{ width: '500px' ,marginTop: "30px"}}
                        className="form-input p-3"
                        placeholder="Đại học Bách Khoa Dà Nẵng"
                        {...register("username", { required: "UserName is required" })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '100px', marginLeft: '250px' }}>
                    <label style={{ fontSize: "18px", width: '100px', marginTop: "35px", marginRight: "-15px" }}>Email:</label>
                    <input
                        style={{ width: '500px' ,marginTop: "30px"}}
                        className="form-input p-3"
                        placeholder="ĐạihọcBáchKhoaDàNẵng@gmail.com"
                        {...register("username", { required: "UserName is required" })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '100px', marginLeft: '250px' }}>
                    <label style={{ fontSize: "18px", width: '100px', marginTop: "35px", marginRight: "-15px" }}>Phone:</label>
                    <input
                        style={{ width: '500px' ,marginTop: "30px"}}
                        className="form-input p-3"
                        placeholder="0348944811"
                        {...register("username", { required: "UserName is required" })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '100px', marginLeft: '250px' }}>
                    <label style={{ fontSize: "18px", width: '100px', marginTop: "35px", marginRight: "-15px" }}>Ngày sinh:</label>
                    <input
                        style={{ width: '500px' ,marginTop: "30px"}}
                        className="form-input p-3"
                        placeholder="08/12/2003"
                        {...register("username", { required: "UserName is required" })}
                    />
                    {errors.username && <p className="error-message">{errors.username.message}</p>}
                </div>
                {/* <div className="form-row">
                    <input
                        className="form-input p-3"
                        placeholder="Email"
                        {...register("email", { required: "Email is required" })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </div> */}
                <button type="submit" className="btn-submit btn" disabled={isLoading} style={{ marginLeft: "515px",marginTop:"50px" ,marginBottom:"100px    "}}>
                    {isLoading ? "Đang xử lý..." : "Lưu thông tin"}
                </button>
                {errMsg && <p className="error-message">{errMsg}</p>}

            </form>
        </Wrapper >
    )
}
export default UserProfile;