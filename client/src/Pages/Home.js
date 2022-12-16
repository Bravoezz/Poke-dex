import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../Components/Cards";
import Filters from "../Components/Filters";
import FiltersRes from "../Components/FiltersRes";
import Header from "../Components/Header";
import { getTypes, responsiveIs } from "../Redux/actions";
import "../Styles/Pages_s/Home.css";

const Home = () => {
  const responsive = useSelector(state => state.responsive)
  const dispatch = useDispatch();
  const [paginado, setPaginado] = useState(0);
  const [stateFilter, setStateFilter] = useState(false)
  useEffect(() => {
    dispatch(getTypes());
    if(window.screen.width < 700) dispatch(responsiveIs());
    console.log(window.screen.width)
  }, [dispatch]);

  return (
    <div className="home">
      <Header />
      {
        !responsive?<Filters setPaginado={setPaginado} />
        : <FiltersRes setStateFilter={setStateFilter} />
      }
      {stateFilter && <Filters setStateFilter={setStateFilter} setPaginado={setPaginado} />}
      <div>
        <Cards paginado={paginado} setPaginado={setPaginado} />
      </div>
    </div>
  );
};

export default Home;
