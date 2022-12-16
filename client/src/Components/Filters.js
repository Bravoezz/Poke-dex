import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  catchQ,
  filterApiDb,
  filtered,
  getPokemonsByName,
  reset,
} from "../Redux/actions";

// start the component
const Filters = ({ setPaginado, setStateFilter }) => {
  const { query, types, responsive } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    f1: {
      AZ: "",
      D: "",
    },
    f2: "",
  });

  const handleFilter = () => {
    dispatch(filtered(filter));
    setPaginado(0);
    if (responsive) setStateFilter(false);
  };
  const handleSelectOne = (e) => {
    const data = e.target.value;

    setFilter((prev) => {
      return {
        f1: {
          AZ: data.charAt() === "A" ? data : "",
          D: data.charAt() === "D" ? data : "",
        },
        f2: prev.f2,
      };
    });
  };
  const handleSelectTwo = (e) => {
    const data = e.target.value;

    setFilter((prev) => {
      return {
        f1: prev.f1,
        f2: data,
      };
    });
  };
  const handleApi = () => {
    dispatch(filterApiDb("API"));
    setPaginado(0);
    if (responsive) setStateFilter(false);
  };
  const handleDb = () => {
    dispatch(filterApiDb("DB"));
    setPaginado(0);
    if (responsive) setStateFilter(false);
  };

  const ress = () => {
    dispatch(reset());
    setPaginado(0);
    if (responsive) setStateFilter(false);
  };

  const handleSearch = () => {
    dispatch(getPokemonsByName(search));
    setSearch("");
    if (responsive) {
      setTimeout(() => {
        setStateFilter(false);
      }, 3000);
    }
  };

  const handleChangeInput = (e) => {
    let text = e.target.value;
    setSearch(text);
  };
  useEffect(() => {
    setTimeout(() => {
      if (query) {
        dispatch(catchQ(""));
      }
    }, 5000);
  }, [query, dispatch]);

  return (
    <FiltersContent>
      <div>
        <label htmlFor="search">
          <Sear
            type="text"
            placeholder="Ingrese el nombre..."
            name="search"
            value={search}
            onChange={(e) => handleChangeInput(e)}
          />
          <Button disabled={search ? false : true} onClick={handleSearch}>
            Buscar
          </Button>
          {query ? (
            <Modal>
              <h1 id="h1">{query}</h1>
              <Span></Span>
            </Modal>
          ) : null}
        </label>
      </div>
      <ResponsiveDiv>
        <Select onChange={handleSelectOne}>
          <option value={""}>A-Z && Daño</option>
          <optgroup label="Alfabeticamente">
            <option value={"AA"}>Ascendente</option>
            <option value={"AD"}>Descendente</option>
          </optgroup>
          <optgroup label="Daño">
            <option value={"DA"}>Ascendente</option>
            <option value={"DD"}>Descendente</option>
          </optgroup>
        </Select>
        <Select onChange={handleSelectTwo}>
          <option value={""}>Tipo</option>
          {types?.map((e, i) => (
            <option key={i}>{e.name}</option>
          ))}
        </Select>
        <Button
          onClick={handleFilter}
          disabled={!(filter.f1.AZ || filter.f1.D || filter.f2) ? true : false}
        >
          FILTRAR
        </Button>
      </ResponsiveDiv>
      <div>
        <Button onClick={ress}>reset</Button>
      </div>
      <div>
        <Button onClick={handleApi}>api</Button>
        <Button onClick={handleDb}>db</Button>
      </div>
      {responsive && <h1>By Brayan</h1>}
    </FiltersContent>
  );
};

export default Filters;
const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  #h1 {
    color: #ddd;
    font-weight: bolder;
    background-color: black;
    padding: 20px 20px;
    border-radius: 45px;
  }
`;
const Span = styled.span`
  width: 300px;
  height: 300px;
  background-image: url(https://media.tenor.com/WtXLzwmxu_8AAAAj/pikachu-laughing.gif);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px auto;
  font-size: 30px;
`;
export const Sear = styled.input`
  padding: 8px 10px;
  border-radius: 10px;
  background-color: transparent;
  color: #b3b3b3;
  border: 2px solid #b3b3b3;
`;

export const Select = styled.select`
  overflow: hidden;
  background-color: transparent;
  padding: 8px 10px;
  border-radius: 10px;
  font-weight: bolder;
  margin: auto 5px;
  color: #b3b3b3;
  border: 2px solid #b3b3b3;
  option {
    opacity: 0.2;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: #ddd;
  }
  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 45px;
  }
`;

export const Button = styled.button`
  user-select: none;
  all: unset;
  margin: auto 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: bold;
  color: #b3b3b3;
  background-color: transparent;
  border: 2px solid #b3b3b3;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  padding: 8px 10px;
  &:hover {
    background-color: ${(props) =>
      `${props.disabled ? "transparent" : "transparent"}`};
    box-shadow: ${(props) =>
      `${props.disabled ? null : "0px 15px 20px #212121"}`};
    color: #fff;
    transform: ${(props) =>
      `${props.disabled ? "translateY(0)" : "translateY(-7px)"}`};
  }
  &:active {
    transform: ${(props) =>
      `${props.disabled ? "translateY(0)" : "translateY(-1px)"}`};
  }
`;

const FiltersContent = styled.div`
  height: 50px;
  display: flex;
  transition: 2s ease all;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  margin: 20px;
  user-select: none;
  border-bottom: solid 2px rgba(220, 220, 220, 0.3);
  @media screen and (max-width: 767px) {
    position: fixed;
    background-color: rgb(30, 30, 32);
    z-index: 100;
    top: 0px;
    left: 0px;
    height: 100vh;
    width: 60%;
    flex-direction: column;
    margin: 0px;
    padding-top: 70px;
    justify-content: flex-start;
    gap: 80px;
    transition: 2s ease all;
  }
`;
const ResponsiveDiv = styled.div`
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 10px;
  }
`;
