const initialState = {
  allPokemons: [],
  temp: [],
  filteredApiDb: [],
  tempApiDb:[],
  filteredIs: false,
  pokemonsQuery: [],
  pagBY:false,
  query: "",
  types:[],
  deletePokemons:[],
  responsive: false,
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_POKEMONS":
      const te = action.payload.filter(e => e.name)
      return {
        ...state,
        allPokemons: action.payload,
        temp: te,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };

    case "FILTERED":
      const prevApiDb = state.tempApiDb.filter(e => e.name)
      const prev = state.temp.filter(e => e.name)
      state.filteredApiDb = prevApiDb;
      state.allPokemons = prev;
      const AZ = action.payload.f1.AZ;
      const D = action.payload.f1.D;
      const { f2 } = action.payload;
      let fil = state.filteredIs ? state.filteredApiDb : state.allPokemons;
      let filt = [];
      if (AZ) {
        if (AZ === "AD") {
          filt = fil.sort((a, b) => {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
        }else if(AZ === "AA"){

          filt = fil.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
        }
      }
      if (D) {
        if (D === "DD") {
          filt = fil.sort((a, b) => {
            if (a.attack < b.attack) return -1;
            if (a.attack > b.attack) return 1;
            return 0;
          });
        }else if(D === "DA"){
          
          filt = fil.sort((a, b) => {
            if (a.attack > b.attack) return -1;
            if (a.attack < b.attack) return 1;
            return 0;
          });
        }
      }
      if(!f2){
        return {
          ...state,
          allPokemons: !state.filteredIs?filt:[],
          filteredApiDb:state.filteredIs?filt:state.filteredApiDb,
        };
      }
      if (f2) {
        let filte;
        if(!(AZ||D)){
           filte = fil.filter((p) => {
            return p.types.some((type) => type.name === f2);
          });
          if(!state.filteredIs){
          return {
            ...state,          
            allPokemons: !filte.length?[]:filte,
          };}
          if(state.filteredIs){
            return {
              ...state,          
              filteredApiDb: !filte.length?[]:filte,
            }
          }
        }
        filte=filt.filter((p) => {
          return p.types.some((type) => type.name === f2);
        });
        if(!state.filteredIs){
        return {
          ...state,
          allPokemons: !filte.length?[]:filte,
        };}
        return {
          ...state,
          filteredApiDb: !filte.length?[]:filte,
        }

      }
      break;

    case "FILTER_API_DB":
      const filter = state.allPokemons.filter((e) =>
        action.payload === "API" ? !e.created : e.created
      );
      const filterTemp = filter.filter(e => e.name)
      return {
        ...state,
        filteredApiDb: filter,
        tempApiDb: filterTemp,
        filteredIs: true,
      };
    case "RESET":
      const poTemp = state.tempApiDb.filter(e => e.name)
      const po = state.temp.filter(e => e.name)
      return {
        ...state,
        allPokemons:po,
        filteredApiDb: poTemp,
        filteredIs: false,
        pokemonsQuery: [],
        query: "",
        pagBY:false,
      };
    case "GET_POKEMONS_BY_NAME":
      return {
        ...state,
        pokemonsQuery: [action.payload],
        pagBY:true,
      };
    case "CATCH":
      return {
        ...state,
        query: action.payload,
      };
    case "DELETE_POKEMONS":
        const deleted = state.temp.filter(e => e.id === action.payload)
    return{
      ...state,
      deletePokemons: [...state.deletePokemons,...deleted]
    }
    case "RESPONSIVE_IS":
      return{
        ...state,
        responsive: true,
      }
    default:
      return { ...state };
  }
}
export default Reducer;

/* const sort = state.allCountries.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }) */
