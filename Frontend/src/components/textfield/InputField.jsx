import colors from "../../constants/Colors";
function InputFieldText({ type, placeholder, value, onChange, icon }) {

    return (
        <div>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                icon={icon}
                style={{
                    backgroundColor: colors.lightBackground
                }}
            />

        </div>
    );
}

export default InputFieldText;