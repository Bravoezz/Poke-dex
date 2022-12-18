export function getAllPokemons() {
  return function (dispatch) {
    fetch("https://back-brpokedex-production.up.railway.app/pokemons")
      .then((data) => data.json())
      .then((data) => dispatch({ type: "GET_ALL_POKEMONS", payload: data }));
  };
}

export function getTypes() {
  return function (dispatch) {
    fetch("https://back-brpokedex-production.up.railway.app/types")
      .then((data) => data.json())
      .then((data) => dispatch({ type: "GET_TYPES", payload: data }));
  };
}
export function filterApiDb(info) {
  return { type: "FILTER_API_DB", payload: info };
}

export function reset() {
  return { type: "RESET" };
}
export function catchQ(info) {
  return { type: "CATCH", payload: info };
}

export function filtered(info) {
  return { type: "FILTERED", payload: info };
}

export function getPokemonsByName(name) {
  return function (dispatch) {
    fetch(`https://back-brpokedex-production.up.railway.app/pokemons?name=${name}`)
      .then((data) => data.json())
      .then((data) => {
        if (!data.error) {
          dispatch({ type: "GET_POKEMONS_BY_NAME", payload: data });
        } else {
          console.log(data.error);
          dispatch({ type: "CATCH", payload: data.error });
        }
      })
      .catch((error) => console.log("hjjola", error));
  };
}

export function deletePokemons(id) {
  return async (dispatch) => {
    try {
      await fetch(`https://back-brpokedex-production.up.railway.app/delete/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_POKEMONS", payload: id });
    } catch (error) {
      console.log(error);
    }
  };
}

export function responsiveIs (){
  return {type: "RESPONSIVE_IS"}
}
