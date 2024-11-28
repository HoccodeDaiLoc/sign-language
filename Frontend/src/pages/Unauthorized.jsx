import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Unauthorized = () => {
    return (
        <Wrapper>
            <div>
                <img src={img} alt='not found' />
                <h3>{`You don't have permission to access this page`}</h3>
                <Link to='/login'>back home</Link>
            </div>
        </Wrapper>
    );

};

export default Unauthorized;