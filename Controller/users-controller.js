const HTTPCodes = require("../Utils/HTTPCodes");
const userServices = require("../Service/users-services");

async function getUserList(req, res) {
  try {
    const credentials = await userServices.getUsersCredentials();

    res.send({
      credentials,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener la lista de usuarios.",
    });
  }
}

module.exports = {
  getUserList,
};
