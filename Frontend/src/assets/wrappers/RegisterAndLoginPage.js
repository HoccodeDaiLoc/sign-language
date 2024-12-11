import styled from 'styled-components';
import backgroundImage from "../../assets/images/ASL-cover-image.jpg"; // Import your image

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  position: relative;

  .textunderline {
    color: hsl(212, 100%, 48%);
  }

  .textunderline:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .login-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .form-container {
    width: 30%;
  }

  .form-row {
    margin-bottom: 15px;
  }

  .form-input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .error-message {
    color: red;
    font-size: 12px;
  }

  .btn-submit {
    padding: 12px;
    background-color: #102c57;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }

  .social-login {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #ccc;
    margin: 5px 0;
    border-radius: 5px;
    cursor: pointer;
  }

  .social-btn img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }

  .register-link {
    width: 100%;
    border: solid 1px #eaeaea;
    height: 15%;
    margin-top: 20px;
  }

  @media (max-width: 768px) {
    .login-container {
      width: 80%;
    }
    .form-container {
      width: 100%;
    }
    .login-form {
      width: 100%;
    }

    .social-login {
      width: 100%;
    }

    .social-btn {
      justify-content: flex-start;
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    .login-container {
      width: 70%;
    }
    .form-container {
      width: 80%;
    }
  }
`;

export default Wrapper;
