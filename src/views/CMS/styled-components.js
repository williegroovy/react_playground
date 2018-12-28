import styled from 'styled-components';

export const ProperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #0F0D0E;
`;

export const Header = styled.header`
  width: 95%;
  display: flex;
  justify-content: space-between;
  padding-left: 100px;
  padding-right: 75px;
  color: white;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 38px;
`;

export const Menu = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 38px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
  
  p {
    margin: 0;
  }
`;

export const MenuButton = styled.button`
  width: 75px;
  height: 25px;
  margin: 0; 5px;
`;

export const Hero = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${({ heroImage }) => heroImage });
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  backdrop-filter: blur(2px);
`;