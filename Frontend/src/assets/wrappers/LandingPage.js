import styled from 'styled-components';

const Wrapper = styled.section`
.landing-container {
    background: #FFF8F8;
    width: 100%;
    max-width: 1600px;

}

.landing-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;
}

.landing-doublebutton {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #ffffff;    
}

.logo-img {
    height: 60px;
    width: 170px;
}

.header-text {
    font-family: 'Train One', cursive;
    font-size: 40px;
    color: #102c57ff;
    margin-left: 10px;
}

.header-button {
    margin-left: auto;
    margin-right: 10px;
    text-align: center;
    background-color: #102C57;
    border: none;
    color: #ffffff;
    padding: 10px 20px;
    border-radius: 30px;
}

.register-link {
    margin-right: 1rem;
}

.main-img {
    width: 100%;
}

.nav-bar {
    display: flex;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
}

.nav-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    font-size: 28px;
    font-weight: bold;
    color: #FFFFFF;
}

.greeting {
    background-color: #E98080;
    flex: 2;
}

.home {
    background-color: #102C57;
    flex: 1;
}

.nav-button {
    background-color: #102c57d1;
    color: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 30px;
    margin: 0 10px;
}

.section {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.card {
    width: 680px;
    height: 500px;
    background-color: #F3E9E3;
    border-radius: 10px;
    box-shadow: 0px 0px 5px #bdbdbd;
    padding: 20px;
}

.card-text {
    color: #a45921ff;
    font-size: 28px;
    font-weight: bold;
}

.section-img {
    width: 30%;
    margin: 220px;
    border-radius: 10px;
    display: block;
}

.quote-section {
    text-align: center;
    margin: 40px 0;
}

.quote {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 33px;
    color: #1e293bff;
}

.paragraph {
    font-family: 'Rubik', sans-serif;
    font-size: 20px;
    font-weight: 400;
    color: #1e293bff;
}

.time-img-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
}

.time-img {
    width: 80%;
}

.landing-footer {
    background-color: #333;
    color: #fff;
    padding: 20px 0;
    border-radius: 10px;
    font-family: Arial, sans-serif;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 20px; 
}

.footer-section {
    flex: 1; 
    margin: 0; 
}

.footer-section.about {
    flex: 3; 
}

.footer-section.logo {
    flex: 1; 
}

.footer-section h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
}

.footer-section p {
    font-size: 1em;
    margin-bottom: 10px;
}

.contact span {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
}

.contact a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.contact a:hover {
    text-decoration: underline;
}

.footer-section ul {
    list-style: none;
    padding: 0;
}

.footer-section ul li {
    margin-bottom: 5px;
    display: flex;
    align-items: center;
}

.footer-section ul li a {
    color: #fff;
    text-decoration: none;
    display: flex;
    align-items: center;
}

.footer-section ul li a:hover {
    text-decoration: underline;
}

.footer-bottom {
    text-align: center;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #102C57;
}

.footer-bottom p {
    font-size: 0.9em;
}

/* Thêm khoảng cách giữa icon và text */
.contact span svg,
.footer-section ul li a svg {
    margin-right: 8px;
    /* Điều chỉnh khoảng cách tùy ý */
}
`;
export default Wrapper;
