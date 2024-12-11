import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }
  .dashboard-page {
  overflow: hidden;

    background-color: #FFF8F8;
      height: calc(100vh - 6rem);
    width: 100%;
    border:0.3px solid #DDDFDD;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
      width: 100%;

    }
    .dashboard-page {
      height: calc(100vh - 6rem);
      width: 100%;
      overflow: hidden;

    }
  }
`;
export default Wrapper;
