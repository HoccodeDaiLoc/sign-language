import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
  .dashboard-page {
    height:100%;
    background-color: #FFF8F8;
    width: 100%;
    border:0.3px solid #DDDFDD;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
      width: 100%;
    }
    .dashboard-page {
      height:100%;
      width: 100%;
    }
  }
`;
export default Wrapper;
