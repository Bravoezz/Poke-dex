import React from "react";
import "../Styles/Components_s/Card.css";
import styled from "styled-components";
//import { useHistory } from "react-router-dom";
import LoadingCard from "./LoadingCard";
import { useState } from "react";
import ModalDetail from "./ModalDetail";

const Card = ({ id, name, url, types, hp, speed, defense, attack, height, weight,created }) => {
  const [state, setState] = useState(false);
  //const Navigate = useHistory();
  const handleClick = () => {
    setState(true);
    // Navigate.push(`/detail/${id}`);
  };
  const colors = {
    normal: "#95afc0",
    fighting: "#30336b",
    flying: "#81ecec",
    poison: "#6c5ce7",
    ground: "#EFB549",
    rock: "#2d3436",
    bug: "#26de81",
    ghost: "#a55eea",
    steel: "#b3b3b3",
    fire: "#f0932b",
    water: "#0190FF",
    grass: "#00b894",
    electric: "#fed330",
    psychic: "#a29bfe",
    ice: "#74b9ff",
    dragon: "#ffeaa7",
    dark: "#4f4a71",
    fairy: "#FF0069",
    unknown: "transparent",
    shadow: "#373737",
  };

  

  return (
    <Cardd  backColor={colors[types[0].name]}>
      <Hp>
        <span id="span">HP</span>
        {hp}
      </Hp>
      {!url ? <LoadingCard /> : <Img src={url} onClick={handleClick} alt={name} id="image" />}
      <Name id="poke-name" onClick={handleClick}>
        {name}
      </Name>
      <Types id="poke-types">
        {types?.map((e, i) => (
          <SpanType id="span" key={i} backColor={colors[e.name]} name={e.name}>
            {e.name}
          </SpanType>
        ))}
      </Types>
      <Stats id="stats">
        <div>
          <h3>{attack}</h3>
          <p id="p">Attack</p>
        </div>
        <div>
          <h3>{defense}</h3>
          <p id="p">Defense</p>
        </div>
        <div>
          <h3>{speed}</h3>
          <p id="p">Speed</p>
        </div>
      </Stats>
      <ModalDetail id={id} state={state} name={name} setState={setState} colors={colors} hp={hp} attack={attack} defense={defense} speed={speed}  height={height} weight={weight} url={url} types={types} created={created}/>
    </Cardd>
  );
};

export default Card;



export const SpanType = styled.span`
  background-color: ${(props) => props.backColor};
  padding: 5px;
  width: 57px;
  color: ${(props) =>
    props.name === "rock" || props.name === "fighting" ? "white" : "black"};
  border-radius: 45px;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  #p {
    color: #404060;
  }
`;

export const Types = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20x 0 40px 0;
`;
const Cardd = styled.div`
  width: 320px;
  height: 450px;
  background: ${(props) =>
    `radial-gradient(circle at 50% 0%, ${props.backColor} 36%, #ffffff 36%)`};
  padding: 30px 20px;
  padding-top: 10px;
  border-radius: 10px;
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  transition: 1s ease all;
  &:hover {
    #image {
      transition: 1s ease all;
      transform: scale(1.5) translateY(-30px);
    }
  }
  #span {
    font-size: 12px;
    letter-spacing: 0.4px;
    font-weight: 600;
  }
`;

const Img = styled.img`
  display: block;
  height: 200px;
  max-height: 200px;
  position: relative;
  margin: 20px auto;
  transition: 1s ease all;
`;

const Hp = styled.p`
  width: 80px;
  padding: 8px 0px;
  background-color: #fff;
  text-align: center;
  border-radius: 30px;
  margin-left: auto;
  font-weight: 400;
`;

const Name = styled.h2`
  margin-left: auto;
  font-weight: 600;
  cursor: pointer;
`;

/* <Mod>
          <div>
          <button onClick={()=> setState(false)}>Salir de modal</button>
          <h1>Hola modal</h1>
          </div>
          <h1>Ahhh modal</h1>
        </Mod> */
