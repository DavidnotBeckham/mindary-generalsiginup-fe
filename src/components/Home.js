import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navbar1 from './Navbar1';
import FooterExcel from './FooterExcel';
import GeneralSignUp from './GeneralSignUp';

const Home = () => {
  return (
    <Container>
      <Header />
      <Navbar1 />
      <Content>
        <Grid>
          <FooterExcelContainer>
            <FooterExcel />
            <GeneralSignUpContainer>
              <GeneralSignUp />
            </GeneralSignUpContainer>
          </FooterExcelContainer>
        </Grid>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 52px; /* Navbar height */
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 52px); /* Adjust based on Navbar height */
  position: relative;
`;

const GeneralSignUpContainer = styled.div`
  position: fixed;
  top: 261px; /* Adjust based on the row height and desired position */
  left: 514px; /* Adjust based on the column width and desired position */
  z-index: 10; /* Ensure the form is above the table */
`;

const FooterExcelContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export default Home;
