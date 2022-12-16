import React,{useState,useEffect} from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { deletePokemons } from "../Redux/actions";
import { Types, SpanType } from "./Card";

const Modalil = ({  id,  colors,  state,  setState,  name,  url,  types,  hp, speed, defense,  attack,  height, weight, created,
}) => {
  const [hpst, setHpst] = useState(0);

  const dispatch = useDispatch()
  const Navigate = useHistory()
  const handleUpdate = (id)=>{
    Navigate.push(`/update/${id}`)
  }
  
  const handleDelete = id =>{
    setState(false);
    dispatch(deletePokemons(id))
    window.location.replace("")
  }

  useEffect(() => {
    if (hpst < hp) {
      setTimeout(() => {
        setHpst((v) => (v += 1));
      }, 30);
    }
  }, [hpst, hp]);

  return (
    <>
      {state && (
        <PokeModal>
          <Mod color={colors[types[0].name]}>
            <CardModal backColor={colors[types[0].name]}>
              <PokeImg src={url} alt={name} id="pokeimg" />
              <Name color={colors[types[0].name]} id="name">
                {name}
              </Name>
              <Types id="poke-types">
                {types?.map((e, i) => (
                  <SpanType
                    id="span"
                    key={i}
                    backColor={colors[e.name]}
                    name={e.name}
                  >
                    {e.name}
                  </SpanType>
                ))}
              </Types>
            </CardModal>
            <DetailModal>
              <Stats>
              <ul>
            <li>hp<ProgressBar colorProgres={colors[types[0].name]} max={500} value={hpst}/> {hpst}</li>
            <li>attack<ProgressBar colorProgres={types[1]?colors[types[1].name]:colors[types[0].name]} max={190} value={attack}/> {attack}</li>
            <li>defense<ProgressBar colorProgres={colors[types[0].name]} max={255} value={defense}/> {defense}</li>
            <li>speed <ProgressBar colorProgres={types[1]?colors[types[1].name]:colors[types[0].name]} max={116} value={speed}/> {speed}</li>
            <li>height<ProgressBar colorProgres={colors[types[0].name]} max={200} value={height}/>{height}</li>
            <li>weight<ProgressBar colorProgres={types[1]?colors[types[1].name]:colors[types[0].name]} max={10000} value={weight}/>{weight}</li>
          </ul>
              </Stats>
              <MoreButtons>

                <button onClick={()=> setState(false)}>Back</button>
              {
              created && <>
              <button onClick={()=> handleDelete(id)}>
                Delete
              </button>
              <button onClick={()=> handleUpdate(id)}>Update</button>
              </>
              }
              </MoreButtons>
            </DetailModal>
          </Mod>
        </PokeModal>
      )}
    </>
  );
};

export default Modalil;

const MoreButtons = styled.div`
display: flex;
width: 100%;
align-items: center;
justify-content: space-around;
flex-direction: row;
button{
  background-color:#212121;
  color: white;
}
`;

const ProgressBar = styled.progress`
 -webkit-appearance: none;
-moz-appearance: none;
outline: 0;
height: 23px;
border-radius: 10px;

::-webkit-progress-bar{
  border-radius: 10px;
  background: #b3b3b37d;

}
::-webkit-progress-value{
  border-radius: 10px;
  background: ${props => props.colorProgres};
  
}
@media screen and (max-width: 767px) {
  height: 17px;
  width: 59% !important;
  }
`;

const PokeImg = styled.img`
  display: block;
  height: 200px;
  max-height: 200px;
  position: relative;
  margin: 20px auto;
  transition: 1s ease all;
  @media screen and (max-width: 767px) {
   height: 100px;
  }
`;

const PokeModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 60;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  backdrop-filter: blur(1px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: 2s ease all;
  padding: 0;
  
`;

const CardModal = styled.div`
  height: 100%;
  width: 50%;
  border-radius: 10px;
  background: ${(props) =>
    `radial-gradient(circle at 50% 0%, ${props.backColor} 41.5%, #ffffff 42%)`};
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
  #poke-types{
    width: 100%;
    margin: 0;
  }
  span{
    padding: 10px 30px;
    font-size: 20px !important;
    
  }
  img{
   transform: scale(1.4);
  }
  @media screen and (max-width: 767px) {
    height: 50%;
  width:100%;
  gap: 20px;
  span{
    padding: 5px 10px;
    font-size: 15px !important;
  }
  }
`;

const Name = styled.h1`
  text-transform: uppercase;
  color: ${(props) => props.color};
`;

const Stats = styled.div`
height: 80%;
width: 80%;
@media screen and (max-width: 767px) {
   height: auto;
  width:90%;
  }
ul{
  padding: 0px;
 
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  li{
    height: 60px;
    color: gray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 25px;
    font-weight: bolder;
    @media screen and (max-width: 767px) {
   font-size: 18px;
   align-content: space-between;
   height: 40px;
  }
  }
}

h2{
  color: gray;
}
`;
const DetailModal = styled.div`
  height: 100%;
  width: 50%;
  border-radius: 10px;
padding: 20px 30px;
display: flex;
flex-direction: column;
align-items: center;
@media screen and (max-width: 767px) {
   padding: 0px;
  
    height: 50%;
  width:100%;
  
  }
`;

const Mod = styled.div`
  width: 70%;
  height: 70%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
  border: ${(props) => `solid 3px ${props.color}`};
  @media screen and (max-width: 767px) {
    flex-direction: column;
    align-content: center;
  }
`;
