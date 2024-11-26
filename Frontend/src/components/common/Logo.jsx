import logo from '../../assets/images/logo.svg';

const Logo = ({ size }) => {
    return <img src={logo} alt='Tbi' className='logo' style={{
        width: `${size}`, height: `${size}`
    }} />
}

export default Logo;