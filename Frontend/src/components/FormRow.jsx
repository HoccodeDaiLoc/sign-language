const FormRow = ({ type, name, value, onChange, labelText, placeholder }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                className='form-input'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required
            />
        </div>
    );
};

export default FormRow;
