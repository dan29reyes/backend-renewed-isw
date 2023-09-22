const modulesService = require("../Service/modules-services");

/*http://localhost:3000/modulos/all*/

const getModulos = async (req, res) => {
  console.log("query", req.query);
  console.log("params", req.params);
  try {
    const modulos = await modulesService.getModulos();
    res.send(modulos);
  } catch (e) {
    console.log(e);
  }
};

/**
 http://localhost:3000/modulos

 {
    "name": "spooderman",
  "description": "john wick en el espacio "
 }

Json text 
 */

const createMod = async (req, res) => {
  const { name, description } = req.body;

  try {
    if (typeof name == "string" && typeof description == "string") {
      const [id] = await modulesService.createMod(req.body);
      res.send({ id });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};
/*http://localhost:3000/modulos/modNom 
{
 "id":1,
 "name": " New Beyong"   
}
*/
const updateModName = async (req, res) => {
  const { id, name } = req.body;
  try {
    if (typeof id == "number" && typeof name == "string") {
      await modulesService.updateModName(id, name);
      res.send({ updatedModuloId: id });
    }
  } catch (e) {
    console.log(e);
  }
};
/**{
http://localhost:3000/modulos/modDes


 "id":1,

 "description": " New Beyong"   
} */

const updateModDes = async (req, res) => {
  const { id, description } = req.body;
  try {
    if (typeof id == "number" && typeof description == "string") {
      await modulesService.updateModDes(id, description);
      res.send({ updatedModuloId: id });
    }
  } catch (e) {
    console.log(e);
  }
};

/* http://localhost:3000/modulos
  {
    "id": 1
}
  */
const deleteMod = async (req, res) => {
  const { id } = req.body;
  console.log("Modulo ID:", id); // Check if the id is correctly received
  try {
    await modulesService.deleteMod(id);
    res.send({ deletedModId: id });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  getModulos,
  createMod,
  updateModName,
  updateModDes,
  deleteMod,
};

// const getCardsByList = async (req, res) => {

//   const { ListId } = req.query;

//   try {
//     const modulos = await cardService.getCardsByList(ListId);
//     res.send(modulos);  } catch (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const updateCardPos = async (req, res) => {
//   const { cardId, position } = req.query;
//   try {
//     if (typeof cardId == "number" && typeof position == "number") {
//       await cardService.updateCardPos(cardId, position);
//       res.send({ updatedCardId: cardId });
//     }
//   } catch (e) {
//     console.log(e);
//   }
// };
// const updateCardList = async (req, res) => {
//   const { cardId, list_id } = req.query;
//   try {
//     if (typeof cardId === "number") {
//       await cardService.updateCardList(cardId, list_id);
//       res.send({ updatedCardId: cardId });
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const deleteCard = async (req, res) => {
//   const { cardId } = req.query;
//   console.log('Card ID:', cardId); // Check if the cardId is correctly received
//   try {
//     await cardService.deleteCard(cardId);
//     res.send({ deletedCardId: cardId });
//   } catch (e) {
//     console.log(e);
//   }
// };
