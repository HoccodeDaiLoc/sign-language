import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useState } from 'react';
import { FormRow } from "../../components";

function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !lastName || !location) {
            return;
        }

    }

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit} >
                <h3 style={{ marginLeft: "300px" }}> Thông tin cá nhân</h3> <br />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <FormRow
                        type='Họ tên'
                        name='Họ tên'
                        placeholder="Ho Xuan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        labelText='Tên'
                        type='text'
                        name='Tên '
                        placeholder="Thanh"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={email}
                        placeholder="hothanh0812@gmail.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormRow
                        type='text'
                        name='Địa chỉ'
                        value={location}
                        placeholder="151 Âu cơ ,Hòa Khánh,Đà Nẵng "
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button
                        className='btn btn-block'
                        type='submit'

                        style={{ padding: '10px 24px', fontSize: '18px', marginTop: "20px" }}
                    >
                        Save changes
                    </button>

                </div>
            </form>
        </Wrapper>
    )
}
export default Profile;