import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Pagination = ({ paginado, setPaginado, allPage }) => {
  const {pagBY,responsive} = useSelector((state) => state);
  const pag = [];
  for (let i = 0; i < Math.ceil(allPage / 12); i++) {
    pag.push(i);
  }
  const handleClick = (i) => {
    setPaginado(12 * i);
  };
  const isActive = (i) => Math.ceil(paginado / 12) === i;

  if(!responsive)
  return (
    <>
      {pag.length ? (
        <div>
          {!pagBY ? (
            pag?.map((i) => (
              <Button
              type={"button"}
              value={i + 1}
                key={i}
                active={isActive(i)}
                onClick={() => handleClick(i)}
              />
                
            ))
          ) : (
            <Button type={"button"} value={1} active={true}/>
          )}
        </div>
      ) : (
        <Load> - - - - </Load>
      )}
    </>
  );
  if(responsive)
  return (
  
    <Load> - -  - </Load>

  );
};

export default Pagination;

const Button = styled.input`
all: unset;
  background-color: ${(props) => `${props.active ? "#691d1d" : "transparent"}`};
  transform: ${(props) => `${props.active ? "scale(1.2)" : "scale(1)"}`};
  border-radius:20%;
  margin: auto 2px;
  font-size: 12px;
  font-weight: bold;
  color: #b3b3b3;
  border: 2px solid #b3b3b3;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  padding: 8px 10px;
  user-select: none;
  &:hover {
    background-color: #212121;
    box-shadow: 0px 15px 20px #212121;
    color: #fff;
    transform: translateY(-7px);
  }
  &:active {
    transform: translateY(-1px);
  }
`;

const Load = styled.div`
font-size: 30px;
font-weight: 600;
color:white;
`
;