import React from "react";
import { useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Header = () => {
  const Navigate = useHistory();
  const url =
    "https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Pok%C3%A9mon-Logo-PNG-1024x768.png";
  return (
    <HeaderDiv>
      <LogoHome src={url} className="logoHome" />

      <H1 onClick={() => Navigate.push("/post")}>CREA UN POKEMON !!!</H1>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100px;
  padding: 0px 60px;
  @media screen and (max-width: 767px) {
    margin: 25px 0px;
    margin-top: 1px;
    padding: 0px 7px;
  }
`;

const Animation = keyframes`
0% {border: 2px solid #b3b3b3; border-radius: 10px; }
 30% { border: 4px solid #30336b; border-radius: 15px;}

 40% {border: 5px solid #5f1d1d; border-radius: 20px;}
 60% {border: 3px solid #5f1d1d; border-radius: 25px;}
 80% {border: 2px solid #5f1d1d; border-radius: 20px;}

 100% { border: 1px solid #EFB549; border-radius: 15px;}
`;
const H1 = styled.div`
  border: 2px solid #b3b3b3;
  border-radius: 10px;
  padding: 10px 10px;
  animation: ${Animation} 5s ease infinite;
  @media screen and (max-width: 767px) {
    font-size: 15px;
    font-weight: bolder;
  }
`;

const LogoHome = styled.img`
  height: 100px;
  transform: scale(2);
  margin: 0px;
  @media screen and (max-width: 767px) {
    transform: scale(2) translateX(5px);
    height: 70px;
  }
`;
