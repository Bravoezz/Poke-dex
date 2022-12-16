import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Select, Sear, Button } from "../Components/Filters";
import { InputR } from "./Detail";

const Post = () => {
  const Navigate = useHistory();
  const types = useSelector((state) => state.types);
  const [pokes, setPokes] = useState(false)
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

  const handleChange = (e) => {
    e.preventDefault();
    setPoke((r) => ({ ...r, [e.target.name]: e.target.value }));
  };

  const postPokemon = async () => {
    try {
      await axios.post("http://localhost:3001/pokemons", poke);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postPokemon();
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
    setPokes(true)
    setTimeout(() => {
      setPokes(false)
    }, 2000);
  };

  return (
    <Posts>
      {
        pokes?<h1>Pokemon Creado!!!</h1>: null
      }
      <h1>Crea tu Pokemonnn!!</h1>
      <Container>
        <form
          id="form"
          onSubmit={handleSubmit}
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
          <Submit
            disabled={
              !(
                poke.name &&
                poke.attack &&
                poke.defense &&
                poke.height &&
                poke.hp &&
                poke.image &&
                poke.speed &&
                poke.weight &&
                (poke.type1 || poke.type2)
              )
            }
            type="submit"
          />
        </form>
      <Button onClick={() => Navigate.push("/home")}>Atras</Button>
      </Container>
    </Posts>
  );
};

export default Post;

export const Submit = styled.input`
width: 100%;
  padding: 8px 10px;
  border-radius: 10px;
  background-color: transparent;
  color: #b3b3b3;
  border: 2px solid #b3b3b3;
  font-weight: bolder;
  &:active{
    transition: 1s ease all;
    transform: scale(0.9);
  }
`;

export const Posts = styled.div`
  background-color: #212121;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
border-radius:45px;
  box-shadow: 5px 5px 10px black;
  user-select: none;
  width: 400px;
  padding: 20px;
  @media screen and (max-width: 767px) {
   padding: 30px 5px;
   width: 360px;
  }
  #form{
    width: 300px;
    display: flex !important;
  flex-direction: column !important;
  gap: 5px;
    label{
      display: flex !important;
  flex-direction: row !important;
  align-items: center;
  font-weight: 600;
    justify-content: space-between !important;
    #select{
      width: 220px ;
    } 
    #sear{
      width: 200px ;
    }
    } 
  }
`;
