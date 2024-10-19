import styled from 'styled-components';
import image from '../images/imagelogin.png'; // Thay đổi đường dẫn tới hình ảnh của bạn

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${image}); /* Đặt hình ảnh làm nền */
  background-size: cover;
  background-position: center;

  .login-container {

    border-radius: 10px;
  }

  .form {
    border-top: 5px solid #102C57; /* Thay đổi màu sắc */
  }

  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
  }

  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }

  .btn {
    margin-top: 1rem;
    background-color: #102C57; /* Thay đổi màu nền */
    color: white; /* Thay đổi màu chữ */
    border: none;
    padding: 0.75rem 1.5rem;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 5px;
    transition: background-color 0.3s ease, color 0.3s ease; /* Thêm hiệu ứng transition */
  }

  .btn-block {
    display: block;
    width: 100%;
  }

  .btn:hover {
    background-color: white; /* Thay đổi màu nền khi hover */
    color: #102C57; /* Thay đổi màu chữ khi hover */
    border: 1px solid #102C57; /* Thêm border khi hover */
  }

  .member-btn {
    color: #102C57; /* Thay đổi màu sắc */
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }

  .remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }

  .remember-forgot label {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }

  .remember-forgot input[type='checkbox'] {
    margin-right: 0.5rem;
  }

  .forgot-password {
    color: #102C57; /* Thay đổi màu sắc */
    font-size: 0.9rem;
    text-decoration: none;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }
`;

export default Wrapper;