const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon, Type, pokemon_type } = require("../db.js");



const getPokemonsApi = async () => {
  try {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=300&limit=70",{ 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });
    const {
      data: { results: poke2 },
    } = await axios.get(data.next, { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });
    const arrayPoke = [...data.results, ...poke2];
    const finaly = Promise.all(
      arrayPoke.map(async (p) => {
        const { data } = await axios.get(p.url, { 
          headers: { "Accept-Encoding": "gzip,deflate,compress" } 
      });
        return {
          name: data.name,
          id: Number(data.id),
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weight: data.weight,
          image: data.sprites.other.dream_world.front_default,
          types: data.types.map(({ type: { name } }) => {
            return { name };
          }),
          created: false,
        };
      })
    );
    return finaly;
  } catch (error) {
    console.log(error);
  }
};

const getDetailApiIdAndName = async (id) => {
  let co = null;
  if (typeof id === "string") {
    co = id.toLowerCase();
  }
  try {
    const { data } = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${co ? co : id}`, { 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    }
    );
    return {
      name: data.name,
      id: Number(data.id),
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat,
      height: data.height,
      weight: data.weight,
      image: data.sprites.other.dream_world.front_default,
      types: data.types.map(({ type: { name } }) => {
        return { name };
      }),
      created: false,
    };
  } catch (error) {
    return null;
  }
};

const getPokemonsDb = async () => {
  try {
    const pokeinfo = Pokemon.findAll({
      include: {
        model: Type,
        through: {
          attributes: [],
        },
        attributes: ["name"],
      },
    });
    return pokeinfo;
  } catch (error) {
    console.log(error);
  }
};

const getAllPokemons = async () => {
  const g = await getPokemonsApi();
  const l = await getPokemonsDb();
  const all = [...l, ...g];
  return all;
};
async function create() {
  await Pokemon.create({
    name: "hodli",
    hp: 1000,
    attack: 1000,
    defense: 1000,
    speed: 1000,
    height: 1000,
    weight: 1000,
    image: "1000",
  });
  await Type.create({ id: 1, name: "taaa" });
}

// c********** controlers rutes ***********************

const deletePokemons = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) throw Error("id inexistente");
    const dlt = await Pokemon.findByPk(id);
    await dlt.destroy();
    res.status(200).send("Pokemon eliminado correctamente");
  } catch (error) {
    console.log(error);

    res.status(401).json(error);
  }
};

const updatePokemon = async (req, res) => {
  const {
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    image,
    type1,
    type2,
    newtype1,
    newtype2,
  } = req.body;
  const name = req.body.name.toLowerCase();
  const { id } = req.params;
  try {
    if (!id) throw Error("Id de pokemon inexistente");
    const poke = await Pokemon.findByPk(id);
    if (!poke) throw Error("Pokemon no encontrado");
    const newPoke = await poke.set({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    await poke.save();
    if (newtype1) {
      if (type1) {
        const destroyType = await pokemon_type.findOne({
          where: { typeId: type1 },
        });
        await destroyType.destroy();
      }
      await poke.addType(newtype1, {
        through: "pokemon_type",
      });
    }
    if (newtype2) {
      if (type2) {
        const h2 = await pokemon_type.findOne({ where: { typeId: type2 } });
        await h2.destroy();
      }
      await poke.addType(newtype2, {
        through: "pokemon_type",
      });
    }
    res.status(200).json("Pokemon modificado");
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error.message });
  }
};

const getPokemonsApiOrDb = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const names = name.toLowerCase();
      const pok = await Pokemon.findAll({
        where: { name: name },
        include: {
          model: Type,
          through: {
            attributes: [],
          },
          attributes: ["name"],
        },
      });
      if (pok.length) return res.status(200).json(pok[0]);
      //const filtered = pokApi.filter(e => e.name.toLowerCase() === name.toLowerCase());
      const pokApi = await getDetailApiIdAndName(name);
      if (pokApi) return res.status(200).json(pokApi);
      throw Error(`El pokemon ${name} no existe`);
    }
    const all = await getAllPokemons();
    res.status(200).json(all);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};

const getPokemonsById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokDetail = await getDetailApiIdAndName(id);
    console.log(pokDetail);
    if (pokDetail) return res.status(201).json([pokDetail]);
    const dbId = await Pokemon.findByPk(id, {
      include: {
        model: Type,
        through: {
          attributes: [],
        },
        attributes: ["name"],
      },
    });
    if (!dbId) throw Error(`El id ${id} no existe`);
    if (dbId.name) return res.status(201).json([dbId]);
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ error: error.message });
  }
};

const postPokemons = async (req, res) => {
  const { hp, attack, defense, speed, height, weight, image, type1, type2 } =
    req.body;
  const name = req.body.name.toLowerCase();
  try {
    if (
      !(
        hp &&
        attack &&
        defense &&
        speed &&
        height &&
        weight &&
        image &&
        (type1 || type2)
      )
    ) {
      throw Error();
    }
    const cr = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });
    const add = await cr.addType(type1, {
      through: "pokemon_type",
    });
    const addd = await cr.addType(type2, {
      through: "pokemon_type",
    });
    return res.status(200).json(cr);
  } catch (error) {
    console.log(error);
    return res.status(401).send("Algo salio mal");
  }
};

module.exports = {
  updatePokemon,
  deletePokemons,
  getPokemonsApiOrDb,
  getPokemonsById,
  postPokemons,
};
