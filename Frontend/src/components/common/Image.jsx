const Image = ({ size, imgsrc, imgAlt, }) => {
    return <img src={imgsrc} alt='imgAlt' style={{
        width: `${size}`, height: `${size}`
    }} />
}

export default Image;