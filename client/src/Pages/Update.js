import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { InputR, Pika, Container, Img } from "./Detail";
import { Submit, Container as AHH } from "./Post.js";
import { Select, Sear, Button as Btn } from "../Components/Filters";
import axios from "axios";
import ButtonChange from "../Components/ButtonChange";

const Update = () => {
  const { id } = useParams();
  const [det, setDet] = useState({});
  const Navigate = useHistory();
  const {types, responsive} = useSelector((state) => state);
  const [poke, setPoke] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    image: "",
    type1: 0,
    type2: 0,
  });
  useEffect(() => {
    const getDetail = async () => {
      try {
        const data = await fetch(`https://back-brpokedex-production.up.railway.app/pokemons/${id}`);
        const [result] = await data.json();
        setDet(result);
      } catch (error) {
        console.log(error);
      }
    };
    getDetail();
  }, [id, setDet]);

  const handleChange = (e) => {
    e.preventDefault();
    setPoke((r) => ({ ...r, [e.target.name]: e.target.value }));
  };

  const postPokemon = async (id) => {
    const befType1 = types.filter( e => e.name === det.types[0]?.name)
    const befType2 = types.filter( e => e.name === det.types[1]?.name)
    let pokeUp = {
      name: poke.name ?poke.name : det.name, 
      hp: poke.hp ?poke.hp : det.hp ,
      attack: poke.attack ?poke.attack : det.attack, 
      defense: poke.defense ?poke.defense : det.defense, 
      speed: poke.speed ?poke.speed : det.speed, 
      height: poke.height ?poke.height : det.height, 
      weight: poke.weight ?poke.weight : det.weight, 
      image: poke.image ?poke.image : det.image, 
      type1: (befType1[0]?.id)? befType1[0]?.id: 0 , 
      type2: (befType2[0]?.id)?befType2[0]?.id: 0,
      newtype1:poke.type1 ?poke.type1:(befType1[0]?.id)? befType1[0]?.id:0,
      newtype2:poke.type2 ?poke.type2:(befType2[0]?.id)? befType2[0]?.id:0,
    };
    
    try {
      await axios.put(`https://back-brpokedex-production.up.railway.app/pokemons/${id}`, pokeUp);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e,id) => {
    e.preventDefault();
    console.log(id)
    postPokemon(id);
    setPoke({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      image: "",
      type1: 0,
      type2: 0,
    });
    Navigate.push("/home")
  };
  return (
    <Updates>
      <Button>
        <Btn onClick={() => Navigate.push("/home")}>Back</Btn>
      </Button>
      <Div>
        <ContDetail>
          <ConContain>
            {det.image ? (
              <Img src={det.image} alt="poke" id="poke" />
            ) : (
              <Pika></Pika>
            )}
            <Container>
              <ul>
                <li>
                  <h1>{det?.name?.toUpperCase()}</h1>{" "}
                </li>
                <li>
                  hp
                  <InputR type="range" max={500} value={det.hp} /> {det.hp}
                </li>
                <li>
                  attack
                  <InputR type="range" max={190} value={det.attack} />{" "}
                  {det.attack}
                </li>
                <li>
                  defense
                  <InputR type="range" max={255} value={det.defense} />{" "}
                  {det.defense}
                </li>
                <li>
                  speed <InputR type="range" max={116} value={det.speed} />{" "}
                  {det.speed}
                </li>
                <li>
                  height
                  <InputR type="range" value={det.height} />
                  {det.height}
                </li>
                <li>
                  weight
                  <InputR type="range" max={1000} value={det.weight} />
                  {det.weight}
                </li>
              </ul>
              {det.types?.map((e, i) => (
                <h2 key={i}>{e.name}</h2>
              ))}
            </Container>
          </ConContain>
        </ContDetail>

        {!responsive? <ButtonChange />
      : <h1>Change Options...</h1>  
      }
        <FormUpdate>
          <AHH>
            <form
              id="form"
              onSubmit={(e)=>handleSubmit(e,id)}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label>
                Ataque{" "}
                <InputR
                  onChange={(e) => handleChange(e)}
                  name="attack"
                  max={190}
                  value={poke.attack}
                />
                {poke.attack}
              </label>
              <label>
                Vida{" "}
                <InputR
                  onChange={(e) => handleChange(e)}
                  name="hp"
                  max={500}
                  value={poke.hp}
                />
                {poke.hp}
              </label>
              <label>
                Defensa{" "}
                <InputR
                  onChange={(e) => handleChange(e)}
                  name="defense"
                  max={255}
                  value={poke.defense}
                />
                {poke.defense}
              </label>
              <label>
                Velocidad{" "}
                <InputR
                  onChange={(e) => handleChange(e)}
                  name="speed"
                  max={116}
                  value={poke.speed}
                />
                {poke.speed}
              </label>
              <label>
                Altura{" "}
                <InputR
                  onChange={(e) => handleChange(e)}
                  name="height"
                  value={poke.height}
                />
                {poke.height}
              </label>
              <label>
                Peso{" "}
                <InputR
                  onChange={(e) => handleChange(e)}
                  name="weight"
                  max={1000}
                  value={poke.weight}
                />
                {poke.weight}
              </label>
              <label>
                Tipo1{" "}
                <Select
                  id="select"
                  onChange={(e) => handleChange(e)}
                  name="type1"
                  value={poke.type1}
                >
                  <option value={""}>---</option>
                  {types?.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </Select>
              </label>
              <label>
                Tipo2{" "}
                <Select
                  id="select"
                  onChange={(e) => handleChange(e)}
                  name="type2"
                  value={poke.type2}
                >
                  <option value={""}>---</option>
                  {types?.map((e) => (
                    <option value={e.id} key={e.id}>
                      {e.name}
                    </option>
                  ))}
                </Select>
              </label>
              <label>
                Imagen{" "}
                <Sear
                  id="sear"
                  type="text"
                  name="image"
                  value={poke.image}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <label>
                Nombre{" "}
                <Sear
                  id="sear"
                  type="text"
                  name="name"
                  value={poke.name}
                  onChange={(e) => handleChange(e)}
                />
              </label>
              <Submit type="submit" />
            </form>
          </AHH>
        </FormUpdate>
      </Div>
    </Updates>
  );
};

export default Update;

const Button = styled.div`
  width: 100%;
`;

const ConContain = styled.div`
display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  margin: 30px;
  padding: 30px;
  border-radius: 45px;
  box-shadow: 5px 5px 10px black;
  user-select: none;
  #poke{
    height: 200px;
    width: auto;
  }
  @media screen and (max-width: 767px) {
   flex-direction: column;
   width: 100%;
   padding: 20px 20px;
   margin: 0px;
   gap: 20px;
  }
  &:hover{
    #poke{
      height: 200px;
      transition: ease 2s all;
      transform: scale(1.2);
    }
  }
`;
const ContDetail = styled.div`
  background-color: #212121;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  @media screen and (max-width: 767px) {
   flex-direction: column;
  }
`;

const Updates = styled.div`
  background-color: #212121;
  width: 100vw;
  height: 100vh;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
   height: 170vh;
   padding-top: 20px;
   justify-content: flex-start;
  }
`;
const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
   flex-direction: column;
  }
`;

const FormUpdate = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
