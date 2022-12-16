import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../Redux/actions";
import Card from "./Card";
import "../Styles/Components_s/Cards.css";
import Pagination from "./Pagination";
import LoadingCards from "./LoadingCards";
import { Button } from "./Filters";

const Cards = ({ paginado, setPaginado }) => {
  const dispatch = useDispatch();
 

  const { allPokemons, filteredIs, filteredApiDb, pokemonsQuery } = useSelector(
    (state) => state
  );
  const allPage = !filteredIs ? allPokemons.length : filteredApiDb.length;
  const pokePag = () => {
    if (!pokemonsQuery.length) {
      if (!filteredIs) {
        return allPokemons.slice(paginado, paginado + 12);
      }
      if (filteredIs) return filteredApiDb.slice(paginado, paginado + 12);
    }
    if (pokemonsQuery.length) {
      return pokemonsQuery;
    }
  };
  const handleNext = () => {
    if (!(pokePag().length < 12)) {
      setPaginado(paginado + 12);
    }
  };
  const handlePrev = () => {
    if (paginado !== 0) setPaginado(paginado - 12);
  };

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className="cards">
      <div className="content-pag">
        <Button onClick={handlePrev}>Prev</Button>
        <Pagination
          allPage={allPage}
          paginado={paginado}
          setPaginado={setPaginado}
        />
        <Button onClick={handleNext}>Next</Button>
      </div>

      <div className="content-cards">
        {pokePag()?.length ? (
          pokePag()?.map((poke, i) => {
            return (
              <Card
                key={poke.id}
                id={poke.id}
                name={poke.name}
                url={poke.image}
                types={poke.types}
                attack={poke.attack}
                defense={poke.defense}
                speed={poke.speed}
                hp={poke.hp}
                created={poke.created}
                height={poke.height}
                weight={poke.weight}
              />
            );
          })
        ) : (
          <LoadingCards />
        )}
      </div>
      <div className="content-pag">
        <Button onClick={handlePrev}>Prev</Button>
        <Pagination
          allPage={allPage}
          paginado={paginado}
          setPaginado={setPaginado}
        />
        <Button onClick={handleNext}>Next</Button>
      </div>
     
    </div>
  );
};

export default Cards;
