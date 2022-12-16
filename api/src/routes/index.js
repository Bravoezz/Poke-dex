const { Router } = require("express");
// Importar todos los routers;
const {getTypes} = require("../Controlers/ctrlTypes.js")
const {
  getPokemonsApiOrDb,
  getPokemonsById,
  postPokemons,
  deletePokemons,
  updatePokemon,
} = require("../Controlers/ctrlPokemon.js");

const router = Router();

// Configurar los routers
router.get("/pokemons", getPokemonsApiOrDb);
router.get("/pokemons/:id", getPokemonsById);
router.post("/pokemons", postPokemons);
router.put("/pokemons/:id", updatePokemon)
router.delete("/delete/:id", deletePokemons);
router.get("/types", getTypes);


module.exports = router;
