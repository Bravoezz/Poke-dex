import React from "react";
import styled, { keyframes } from "styled-components";
import { useHistory } from "react-router-dom";

const Landing = () => {
  const Navigate = useHistory();
  return (
    <Lan fondo="https://pre00.deviantart.net/7870/th/pre/f/2012/099/b/1/pokeball_by_marsovski-d4vkjsx.png   ">
      <Img
        src="https://cdn-0.imagensemoldes.com.br/wp-content/uploads/2020/04/Pok%C3%A9mon-Logo-PNG-1024x768.png"
        alt="logo"
      />
      <Henry onClick={() => Navigate.push("/home")}>Henry Pokemon</Henry>
    </Lan>
  );
};

export default Landing;

const animations = keyframes`
0% {
  scale: 1.05;
  opacity: 0.2;
      transform:  translateY(-50px);
   }
   50% {
      opacity: 1;
      transform:  translateY(20px);
   }
   100% {
      scale: 1.05;
      opacity: 0.2;
      transform:  translateY(-50px);
   }
`;

const Img = styled.img`
transform: scale(1.5);
transition: 2s ease-in all;
  position: relative;
  width: 500px;
  animation: ${animations} 3s  infinite;
  
`;

const Lan = styled.div`
  background-image: ${(props) => `url(${props.fondo})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Henry = styled.button`
  color: white;
  padding: 15px;
  font-size: 20px;
  font-weight: bolder;
  border-radius: 50px;
  background-color: black;
  transition: ease-in 0.5s all;
  &:hover {
    transform: scale(1.1);
    color: white;
    background-color: rgb(0 0 0 /0.5);
    border-color: gray;
    transition: ease 0.9s all;
  }
  &:active {
    transform: scale(0.9);
    background-color: rgb(0 0 0 /0.5);
    opacity: 0;
  }
`;
