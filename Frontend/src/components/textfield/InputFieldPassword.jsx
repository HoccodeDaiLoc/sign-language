import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { useState, forwardRef } from 'react';
import colors from '../../constants/Colors';

const InputFieldPassword = forwardRef(function InputFieldPassword(
    { placeholder, onChange, value }, ref) {
    const [passwordVisible, setPasswordVisible] = useState(false);

    return (
        <Input.Password
            ref={ref}
            placeholder={placeholder}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            style={{
                padding: "10px",
                marginBottom: "10px",
                width: "100%",
                backgroundColor: colors.lightBackground
            }}
            onChange={onChange}
            value={value}
        />
    );
});

export default InputFieldPassword;
