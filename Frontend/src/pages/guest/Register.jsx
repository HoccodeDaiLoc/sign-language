import Wrapper from '../../assets/wrappers/RegisterAndLoginPage';
import { Link, useNavigate } from 'react-router-dom';
import { Flex, Select, Typography, DatePicker, Button } from "antd";

import BackButton from '../../components/common/BackButton';
import ButtonStyled from '../../components/common/ButtonStyled';
import InputFieldText from '../../components/textfield/InputFieldText';
import InputFieldPassword from '../../components/textfield/InputFieldPassword';
import image from '../../assets/images/imagelogin.png';

import moment from 'moment'
import { useForm, Controller } from "react-hook-form";
import { useState } from 'react';
import colors from "../../constants/Colors"
import FaceBook from "../../assets/svg/facebook.svg"
import Google from "../../assets/svg/google.svg"
import Twitter from "../../assets/svg/Twitter X.svg"

const { Option } = Select;

const Register = () => {
    const { Title } = Typography;

    const { control, handleSubmit, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const passwordValue = watch('password');
    const navigate = useNavigate()

    const onSubmit = async (credentials) => {
        //     try {
        //         if (credentials.height)
        //             credentials.height = credentials.height / 100;

        //         if (credentials.weight)
        //             credentials.weight = credentials.weight * 1;

        //         if (credentials.dateOfBirth) {
        //             const date = new Date(credentials.dateOfBirth);
        //             const timestamp = date.getTime();
        //             credentials.dateOfBirth = timestamp;
        //         }
        //         setLoading(true);
        //         const res = await authService.register(credentials);
        //         if (res.is_success) {
        //             showSuccessNotification("Thành công", "Đăng ký tài khoản người dùng thành công!")
        //             navigate("/login")
        //         }
        //         return res.data;
        //     } catch (error) {
        //         showErrorNotification("Đăng ký thất bại", error.message)
        //     } finally {
        //         setLoading(false);
        //     }
    }


    return (
        <Wrapper >

            <Flex vertical className='left-side'>
                <BackButton size={"40px"}></BackButton>

                <Flex className='form' style={{ width: "100%", justifyContent: "space-between" }}>
                    <Flex style={{ width: "100%", height: "100%", alignItems: "flex-start", justifyContent: "center" }} >
                        <Flex style={{ width: "100%", justifyContent: "center", alignItems: "center" }} vertical>

                            <Flex >
                                <Title level={2} style={{ marginBottom: 24, fontSize: 40 }}>
                                    Đăng ký
                                </Title>
                            </Flex>
                            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }} >
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: "Hãy nhập email",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Hãy nhập đúng định dạng email"
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <InputFieldText
                                                {...field}
                                                placeholder="Nhập email"
                                                status={error ? 'error' : ""}
                                            />
                                            {error && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {error.message}
                                                </span>
                                            )}</>
                                    )}
                                />


                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Hãy nhập mật khẩu"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/,
                                            message: "Mật khẩu phải từ 8 đến 32 ký tự, chứa ít nhất 1 chữ cái viết hoa, 1 chữ cái viết thường, và 1 ký tự số."
                                        }
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <InputFieldPassword
                                                {...field}
                                                placeholder={"Nhập mật khẩu"}
                                                status={error ? "error" : ""}
                                            />
                                            {error && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {error.message}
                                                </span>
                                            )}
                                        </>
                                    )}
                                />

                                <Controller
                                    name="confirm_password"
                                    control={control}
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Hãy nhập lại mật khẩu"
                                        },
                                        validate: (value) =>
                                            value === passwordValue || "Mật khẩu không khớp"
                                    }}
                                    render={({ field, fieldState: { error } }) => (
                                        <>
                                            <InputFieldPassword
                                                {...field}
                                                placeholder={"Nhập lại mật khẩu"}
                                            />
                                            {error && (
                                                <span style={{ color: "red", fontSize: "12px" }}>
                                                    {error.message}
                                                </span>
                                            )}
                                        </>
                                    )}
                                />

                                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                                    <Controller
                                        name="date_of_birth"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Ngày sinh là bắt buộc"
                                            },
                                            validate: (value) =>
                                                value && value.isBefore(moment(), 'day') || "Ngày sinh phải trước ngày hôm nay"
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <>
                                                <DatePicker
                                                    {...field}
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                    }}
                                                    style={{
                                                        padding: "10px",
                                                        marginBottom: "10px",
                                                        width: "100%",
                                                        height: "auto",
                                                        backgroundColor: colors.lightBackground
                                                    }}
                                                    format="YYYY-MM-DD"
                                                    placeholder="Ngày sinh"
                                                />
                                                {error && (
                                                    <span style={{ color: "red", fontSize: "12px" }}>
                                                        {error.message}
                                                    </span>
                                                )}
                                            </>

                                        )}
                                    />
                                    <Controller
                                        name="gender"
                                        control={control}
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Hãy chọn giới tính"
                                            }
                                        }}
                                        render={({ field, fieldState: { error } }) => (
                                            <>
                                                <Select
                                                    {...field}
                                                    onChange={(gender) => {
                                                        field.onChange(gender);
                                                    }}
                                                    placeholder="giới tính"
                                                    style={{
                                                        margin: "0px 0px 10px 10px",
                                                        height: "auto",
                                                        width: "60%",
                                                    }}
                                                >
                                                    <Option value="MALE">Nam</Option>
                                                    <Option value="FEMALE">Nữ</Option>
                                                    <Option value="OTHER">Khác</Option>
                                                </Select>
                                                {error && (
                                                    <span style={{ color: "red", fontSize: "12px" }}>
                                                        {error.message}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    />
                                </Flex>
                                <Flex style={{ width: "100%", justifyContent: "space-between" }}>
                                    <div style={{ width: "45%" }}>
                                        <Controller
                                            name="height"
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Hãy nhập chiều cao"
                                                },
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Phải là số"
                                                },
                                                min: {
                                                    value: 0,
                                                    message: "Chiều cao phải cao hơn 100cm"
                                                },
                                                max: {
                                                    value: 250,
                                                    message: "Chiều cao phải thấp hơn 250cm"
                                                }
                                            }}
                                            render={({ field, fieldState: { error } }) => (
                                                <>
                                                    <InputFieldText
                                                        {...field}
                                                        placeholder={"Chiều cao"}
                                                        suffix={"cm"}
                                                    />
                                                    {error && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            {error.message}
                                                        </span>
                                                    )}
                                                </>

                                            )}
                                        />
                                    </div>
                                    <div style={{ width: "45%" }}>
                                        <Controller
                                            name="weight"
                                            control={control}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Hãy nhập cân nặng"
                                                },
                                                pattern: {
                                                    value: /^[0-9]+$/,
                                                    message: "Phải là số"
                                                }
                                                , min: {
                                                    value: 10,
                                                    message: "Cân nặng phải lớn hơn 10kg"
                                                },
                                                max: {
                                                    value: 500,
                                                    message: "Cân nặng phải thấp hơn 500kg"
                                                }
                                            }}

                                            render={({ field, fieldState: { error } }) => (
                                                <>
                                                    <InputFieldText
                                                        {...field}
                                                        placeholder={"Cân nặng"}
                                                        suffix={"kg"}
                                                    />
                                                    {error && (
                                                        <span style={{ color: "red", fontSize: "12px" }}>
                                                            {error.message}
                                                        </span>
                                                    )}
                                                </>

                                            )}
                                        />
                                    </div>
                                </Flex>
                                <Flex style={{ width: "100%", marginTop: "20px" }}>
                                    <ButtonStyled type={"submit"}
                                        cusWidth={"100%"} style={{ width: "100%" }} loading={loading}
                                    >
                                        Đăng kí
                                    </ButtonStyled>
                                </Flex>
                                <Flex style={{ justifyContent: 'space-evenly', margin: "20px 0px" }}>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", borderRadius: "5px", border: `${colors.borderlight} solid 0.3px` }}>
                                        <Button style={{ background: colors.grayLight, width: "100%", height: "100%", border: "none" }}>
                                            <img src={Google} alt="Google Icon" style={{ width: '24px', height: '24px' }} />
                                        </Button>
                                    </Flex>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", borderRadius: "5px", border: `${colors.borderlight} solid 0.3px` }}>
                                        <Button style={{ background: colors.grayLight, width: "100%", height: "100%", border: "none" }}>
                                            <img src={Twitter} alt="Apple Icon" style={{ width: '24px', height: '24px' }} />
                                        </Button>
                                    </Flex>
                                    <Flex style={{ justifyContent: "center", alignItems: "center", width: "80px", height: "40px", borderRadius: "5px", border: `${colors.borderlight} solid 0.3px` }}>
                                        <Button style={{ background: colors.grayLight, width: "100%", height: "100%", border: "none" }}>
                                            <img src={FaceBook} alt="Facebook Icon" style={{ width: '24px', height: '24px' }} />
                                        </Button>
                                    </Flex>
                                </Flex>
                            </form>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>

            <div className='right-side'>
                <img src={image} alt='Login' className='login-image' />
            </div>
        </Wrapper>
    );
};
export default Register;