import { useState } from "react";
import colors from "../../constants/Colors";

function InputFieldGender() {
    const [gender, setGender] = useState(null)

    const handleGender = (e) => {
        setGender(e.targer.value)
    }

    return (<>
        const GenderSelect = (
        <select onChange={(e) => handleGender(e)} style={{
            backgroundColor: colors.lightBackground
        }} defaultValue="Nam">
            <option value="Nam" ></option>
            <option value="Nữ"></option>
            <option value="Khác"></option>
        </select>
        )
    </>);
}

export default InputFieldGender;