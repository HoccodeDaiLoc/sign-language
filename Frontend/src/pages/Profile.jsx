import Wrapper from "../assets/wrappers/DashboardFormPage";
import {useState} from 'react';
import { FormRow } from "../components";

function Profile() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [location, setLocation] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !lastName || !location) {
            return;
        }
        //updateUser({name, email, lastName, location});
    }

    return (
        <Wrapper>
            <form className ="form" onSubmit={handleSubmit} >
                <h3>profile</h3>
                <div className='form-center'>
                <FormRow
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        labelText='last name'
                        type='text'
                        name='lastName'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormRow
                        type='text'
                        name='location'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className='btn btn-block' type='submit'>
                        Save changes
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}
export default Profile;