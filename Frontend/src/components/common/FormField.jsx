
const FormField = ({
    label,
    name,
    defaultValue,
    register,
    errors
}) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 sm:mr-24 sm:ml-64 w-full">
            <label
                className="text-base sm:text-lg w-full sm:w-24 mt-1 sm:mt-0 sm:mr-0"
                htmlFor={name}
            >
                {label}
            </label>
            <div className="flex flex-col w-full">
                <input
                    id={name}
                    name={name}
                    defaultValue={defaultValue}
                    className="form-input p-3 w-full sm:w-[500px] border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register(name, { required: `${label} is required` })}
                />
                {errors[name] && (
                    <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
                )}
            </div>
        </div>
    );
};

export default FormField;
