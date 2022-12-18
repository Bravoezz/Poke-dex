const axios = require("axios");
const { Type } = require("../db.js");

const getTypesApi = async () => {
  try {
    const {
      data: { results },
    } = await axios.get("https://pokeapi.co/api/v2/type", { 
      headers: { "Accept-Encoding": "gzip,deflate,compress" } 
  });
    const res = results.map((e, id) => {
      return { id: id + 1, name: e.name };
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createTypes = async () => {
  const res = await getTypesApi();
  if (!res) throw Error("Bad Request in API");
  await Type.bulkCreate(res);
};

//*********** config ruta Types *****
const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    if (types.length)return res.status(200).json(types);
  } catch (error) {
    console.log(error);
    res.status(404).json("algo salio mal");
  }
};

module.exports = {getTypes,createTypes};
