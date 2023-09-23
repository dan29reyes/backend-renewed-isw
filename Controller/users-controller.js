const HTTPCodes = require("../Utils/HTTPCodes");

const { getUsersCredentials, createUser, updUserAdmin, delUser, 
        findExistingEmail, updUserEmail, updUserPassword, getUserByID
} = require("../Service/users-services");

const { isName, isEmail, isPassword} = require("../Utils/validator");
const crypto = require("crypto");

async function getUserList(req, res) {
  try {
    const credentials = await getUsersCredentials();

    res.send({
      credentials,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener la lista de usuarios.",
    });
  }
}

async function getUser(req, res) {
  const id_account = req.query.id_account;
  
    try {
        const user = await getUserByID(id_account);

        res.send({
            user,
          });
    } catch (e) {
        res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
            error: "No se pudo obtener el usuario.",
          });
    }
}

async function registerUser(req, res) {
  const { id_account, role, name, email, password, active } = req.body;
 
  try {
    const errorMessages = [];
    if (!isName(name)) {
      errorMessage.push("Name is not valid.");
    }
    
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid.");
    }
    
    // if (!isPassword(password)) {
    //   errorMessages.push("Password is not valid.");
    // }
    
    const email_exists = await findExistingEmail(email);
    if (!email_exists) {
      errorMessage.push("This email already exists.");
    }
    
    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, parseInt(process.env.HASH_ITERATIONS), parseInt(process.env.KEY_LENGTH), "sha256")
        .toString("base64");
      
      const newUserId = createUser({
        id_account,
        role,
        name,
        email,
        encryptedPassword,
        salt,
        active,
      });
      
      res.send({
        success: true,
        newUserId,
      });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo crear el usuario.",
    });
  }
}

async function deleteUser(req, res) {
  const id_account = req.body.id_account;

  try {
    await delUser(id_account);
    res.send({
      success: true,
      id_account,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo eliminar el usuario.",
    });
  }
}

async function updateUserAdmin(req, res) {
  try {
    updUserAdmin(req.body);

    res.send({
     success: true,
   });
 } catch (e) {
     res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
         error: "No se pudo actualizar el usuario.",
       });
 }
}

async function updateUserPassword(req, res) {
  const { id_account, password} = req.body;
  const errorMessages = [];

  try {
    // if (!isPassword(password)) {
    //   errorMessages.push("Password is not valid.");
    // }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, parseInt(process.env.HASH_ITERATIONS), parseInt(process.env.KEY_LENGTH), "sha256")
        .toString("base64");

      await updUserPassword({
        id_account: id_account,
        password: encryptedPassword,
        salt: salt,
      });

      res.send({
        success: true,
        id_account,
      });
    }

  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar la contraseña.",
    });
  }
}

async function updateUserEmail(req, res) {
  const { id_account, email } = req.body;
  const errorMessages = [];

  try {
    if (!isEmail(email)) {
      errorMessages.push("Email is not valid.");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      await updUserEmail(req.body);

      res.send({
        success: true,
        id_account,
      });
    }

  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el email.",
    });
  }
}

module.exports = {
  getUserList,
  getUser,
  registerUser,
  deleteUser,
  updateUserAdmin,
  updateUserPassword,
  updateUserEmail,
};
