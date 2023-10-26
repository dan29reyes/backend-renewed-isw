const HTTPCodes = require("../Utils/HTTPCodes");
const userServices = require("../Service/users-services");

const { isEmail, isPassword } = require("../Utils/validator");
const crypto = require("crypto");

async function registerUser(req, res) {
  const { name, email, phone, password } = req.body;

  try {
    const errorMessages = [];
    if (!isEmail(email)) {
      errorMessages.push("Este correo electrónico no es valido");
    }

    if (!isPassword(password)) {
      errorMessages.push("La contraseña no es valida");
    }

    const email_exists = await userServices.findExistingEmail(email);

    if (!email_exists) {
      errorMessages.push("Ya existe una cuenta con este correo electrónico");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(
          password,
          salt,
          parseInt(process.env.HASH_ITERATIONS),
          parseInt(process.env.KEY_LENGTH),
          "sha256"
        )
        .toString("base64");

      const newUserId = createUser({
        name: name,
        email: email,
        phone: phone,
        encryptedPassword: encryptedPassword,
        salt: salt,
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

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const errorMessage = [];

    //Validaciones
    if (!isEmail) {
      errorMessage.push("El correo debe ser un correo valido");
    }

    const email_exists = await userServices.findExistingEmail(email);
    if (email_exists.length === 0) {
      errorMessage.push("No existe un correo con este email");
    }
    if (errorMessage.length) {
      console.log(errorMessage);
      res.send({
        errorMessage,
      });
    } else {
      const email_now = email_exists[0];
      const userEncryptedDetails = encryptPassword(
        password,
        email_now.salt_user
      );

      if (userEncryptedDetails.encryptedPassword === email_now.password_user) {
        const accessToken = jwt.sign(
          {
            id: email_now.id_user,
            email: email_now.email_user,
            name: email_now.name_user,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        const refreshToken = jwt.sign(
          {
            email: email_now.email_user,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "30d",
          }
        );

        res.send({
          name: email_now.name_user,
          accessToken,
          refreshToken,
          id: email_now.id_user,
        });
      } else {
        res.send({ errorMessage: ["Contraseña incorrecta"] });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
}

async function updateUserPassword(req, res) {
  const { email, password } = req.body;
  const errorMessages = [];

  try {
    if (!isPassword(password)) {
      errorMessages.push("La contraseña no es valida");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    } else {
      const salt = crypto.randomBytes(128).toString("base64");
      const encryptedPassword = crypto
        .pbkdf2Sync(
          password,
          salt,
          parseInt(process.env.HASH_ITERATIONS),
          parseInt(process.env.KEY_LENGTH),
          "sha256"
        )
        .toString("base64");

      await userServices.updUserPassword({
        email: email,
        encryptedPassword: encryptedPassword,
        salt: salt,
      });

      res.send({
        success: true,
        email,
      });
    }
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar la contraseña.",
    });
  }
}

async function updateUserName(req, res) {
  const { email, name } = req.body;

  try {
    await userServices.updUserName({
      email: email,
      name: name,
    });

    res.send({
      success: true,
      email,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el nombre.",
    });
  }
}

async function updateUserPhone(req, res) {
  const { email, phone } = req.body;

  try {
    await userServices.updUserPhone({
      email: email,
      phone: phone,
    });

    res.send({
      success: true,
      email,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el telefono.",
    });
  }
}

async function updateUserEmail(req, res) {
  const { email, newEmail } = req.body;
  const errorMessages = [];

  try {
    if (!isEmail(newEmail)) {
      errorMessages.push("Este correo electrónico no es valido");
    }

    if (userServices.findExistingEmail(newEmail)) {
      errorMessages.push("Este correo electrónico ya está en uso");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    }

    await userServices.updUserEmail({
      email: email,
      newEmail: newEmail,
    });

    res.send({
      success: true,
      email,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el correo.",
    });
  }
}

async function updateUserActive(req, res) {
  const { email, active } = req.body;

  try {
    await userServices.changeUserActive({
      email: email,
      active: active,
    });

    res.send({
      success: true,
      email,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el estado.",
    });
  }
}

async function assignRole(req, res) {
  const { id_user, id_rol } = req.body;

  try {
    await userServices.assignRole({
      id_user: id_user,
      id_rol: id_rol,
    });

    res.send({
      success: true,
      id_user,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo asignar el rol.",
    });
  }
}

async function removeRole(req, res) {
  const { id_user, id_rol } = req.body;

  try {
    await userServices.removeRol({
      id_user: id_user,
      id_rol: id_rol,
    });

    res.send({
      success: true,
      id_user,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo remover el rol.",
    });
  }
}

async function getAllusers(req, res) {
  try {
    const users = await userServices.getAllusers();
    res.send(users);
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo obtener los usuarios.",
    });
  }
}

function encryptPassword(
  password,
  salt = crypto.randomBytes(128).toString("base64")
) {
  const encryptedPassword = crypto
    .pbkdf2Sync(
      password,
      salt,
      parseInt(process.env.HASH_ITERATIONS),
      parseInt(process.env.KEY_LENGTH),
      "sha256"
    )
    
    .toString("base64");

  return {
    encryptedPassword,
    salt,
  };
}

module.exports = {
  registerUser,
  loginUser,
  updateUserPassword,
  updateUserName,
  updateUserPhone,
  updateUserEmail,
  updateUserActive,
  assignRole,
  removeRole,
  getAllusers,
};
