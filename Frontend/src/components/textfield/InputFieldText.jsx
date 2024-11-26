import Input from "antd/es/input/Input";
import colors from "../../constants/Colors";
import { forwardRef } from "react";

const InputFieldText = forwardRef(function InputFieldText(
    { placeholder, icon, suffix, ...props },
    ref
) {
    return (
        <div>
            <Input
                ref={ref}
                placeholder={placeholder}
                icon={icon}
                style={{
                    padding: "10px",
                    marginBottom: "10px",
                    width: "100%",
                    backgroundColor: colors.lightBackground,
                }}
                suffix={suffix}
                {...props}
            />
        </div>
    );
});

export default InputFieldText;
