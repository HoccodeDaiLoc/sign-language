import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <div>
                <img src={img} alt='not found' />
                <h3>{`You don't have permission to access this page`}</h3>
                <button onClick={() => navigate(-1)}>Turn Back</button>
            </div>
        </Wrapper>
    );

};

export default Unauthorized;