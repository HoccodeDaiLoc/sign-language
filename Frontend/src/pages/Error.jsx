import { useNavigate } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <div>
                <img src={img} alt='not found' />
                <h3>Ohh! page not found</h3>
                <p>We can't seem to find the page you're looking for</p>

                <button onClick={() => navigate(-1)}>Turn Back</button>
            </div>
        </Wrapper>
    );

};

export default Error;