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


`;
export default Wrapper;
