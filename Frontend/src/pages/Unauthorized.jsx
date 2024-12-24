import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { useNavigate } from 'react-router-dom';
import { store } from '../utils/store'
const Unauthorized = () => {
    const navigate = useNavigate();
    const auth = store.getState().auth.isAuthenticated;
    return (
        <Wrapper>
            {auth ? (
                <div>
                    <img src={img} alt='not found' />
                    <h3>{`You don't have permission to access this page`}</h3>
                    <button onClick={() => navigate("/")}>Turn Back</button>
                </div>
            ) : (
                <div>
                    <img src={img} alt='not found' />
                    <h3>{`You don't have permission to access this page`}</h3>
                    <button onClick={() => navigate("/login")}>Back to login site</button>
                </div>
            )}
        </Wrapper>
    );

};

export default Unauthorized;