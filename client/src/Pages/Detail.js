import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { deletePokemons } from "../Redux/actions";

const Detail = () => {
  const { id } = useParams();
  const [det, setDet] = useState({});
  const Navigate = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    const getDetail = async () => {
      const data = await fetch(`http://localhost:3001/pokemons/${id}`);
      const [result] = await data.json();
      setDet(result);
    };
    getDetail();
  }, [id, setDet]);

  const handleUpdate = (id)=>{
    Navigate.push(`/update/${id}`)
  }
  const handleDelete =(id)=>{
    dispatch(deletePokemons(id))
    Navigate.push("/home")
  }

  return (
    <Details>
      <Button>
        <button onClick={() => Navigate.push("/home")}>Back</button>
        {
         det.created?<>
         <button onClick={()=>handleUpdate(id)}>Update</button>
         <button onClick={()=>handleDelete(id)}>Delete</button>
         </>: null
        }
      </Button>
      <ConContainer>
       {det.image? <Img src={det.image} alt="poke" id="poke"/> : <Pika></Pika>}
        <Container>
          <ul>
            <li><h1>{det?.name?.toUpperCase()}</h1> </li>
            <li>hp<InputR type="range" max={500} value={det.hp}/> {det.hp}</li>
            <li>attack<InputR type="range" max={190} value={det.attack}/> {det.attack}</li>
            <li>defense<InputR type="range" max={255} value={det.defense}/> {det.defense}</li>
            <li>speed <InputR type="range" max={116} value={det.speed}/> {det.speed}</li>
            <li>height<InputR type="range"  value={det.height}/>{det.height}</li>
            <li>weight<InputR type="range" max={1000} value={det.weight}/>{det.weight}</li>
          </ul>
          {det.types?.map((e, i) => (
            <h2 key={i}>{e.name}</h2>
          ))}
        </Container>
      </ConContainer>
    </Details>
  );
};

export default Detail;

export const InputR = styled.input.attrs({type:"range"})`
-webkit-appearance: none;
-moz-appearance: none;
outline: 0;
height: 12px;
border-radius: 45px;
background: orange;
box-shadow: 0px 0px 4px rgba(0,0,0,0.5);
::-webkit-slider-thumb{
  -webkit-appearance: none;
  background-color: gray ;
  height: 24px;
  width: 24px;
  border-radius: 40px;
 }

`;

export const Pika = styled.div`
background-image: url(https://media.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif);
background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
width: 400px;
height: 400px;
`;

export const Img = styled.img`
width: 400px;
height: 400px;
transition: ease 2s all;
`;

export const Details = styled.div`
  background-color: #212121;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ConContainer = styled.div`
 display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgb(55, 65, 64);
  margin: 30px;
  padding: 30px;
  border-radius: 45px;
  box-shadow: 5px 5px 10px black;
  user-select: none;
  &:hover{
    #poke{
      transition: ease 2s all;
      transform: scale(1.2);
    }
  }

`;
export const Container = styled.div`
background-color:rgb(30, 30, 32);
padding: 20px 30px;
border-radius: 45px;
@media screen and (max-width: 767px) {
  color: #b3b3b3;
  border: 2px solid #4f4f4f;
  }
ul{
  padding: 0px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  li{
    color: gray;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

h2{
  color: gray;
}
`;

export const Button = styled.div`
width: 100vw;
`;
