const InputField = ({
    type = "text",
    placeholder = "",
    register,
    name,
    validationRules,
    errors,
    label,
}) => {
    return (
        <div className="form-row">
            {label && <label className="form-label">{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                className="form-input"
                {...register(name, validationRules)}
            />
            {errors[name] && <p className="error-message">{errors[name].message}</p>}
        </div>
    );
};

export default InputField;
