import logo from '../../assets/images/Logo.png';

const Logo = ({ size }) => {
    return <img src={logo} alt='logo' className='logo' style={{
        width: `${size}`, height: `${size}`
    }} />
}

export default Logo;