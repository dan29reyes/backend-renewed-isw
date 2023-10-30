const HTTPCodes = require("../Utils/HTTPCodes");
const userServices = require("../Service/users-services");

const { isEmail, isPassword } = require("../Utils/validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { name, email, phone, password, type, active } = req.body;

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
      let newUserId = null;
      if(type === "patient"){
        newUserId = userServices.createPatient({
          name: name,
          email: email,
          phone: phone,
          encryptedPassword: encryptedPassword,
          salt: salt,
        });
      }else{
        newUserId = userServices.createUser({
          name: name,
          email: email,
          phone: phone,
          encryptedPassword: encryptedPassword,
          salt: salt,
          active: active,
        });
      }

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

        res.cookie("email", email, {
          maxAge: 259200000, // Duración de 3 días en milisegundos
          httpOnly: true, // La cookie solo es accesible desde el servidor
          secure: true, // La cookie solo se envía a través de conexiones seguras (HTTPS)
          sameSite: "lax", // Restringe el envío de cookies a solicitudes de terceros
          signed: true, // Habilita la firma de la cookie
        });

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
  const { email, password, editor } = req.body;
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
        editor: editor,
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
  const { id, name, editor } = req.body;

  try {
    await userServices.updUserName({
      id: id,
      name: name,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el nombre.",
    });
  }
}

async function updateUserPhone(req, res) {
  const { id, phone, editor } = req.body;

  try {
    await userServices.updUserNumber({
      id: id,
      phone: phone,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el telefono.",
    });
  }
}

async function updateUserEmail(req, res) {
  const { id, newEmail, editor } = req.body;
  const errorMessages = [];

  try {
    if (!isEmail(newEmail)) {
      errorMessages.push("Este correo electrónico no es valido");
    }

    if (!userServices.findExistingEmail(newEmail)) {
      errorMessages.push("Este correo electrónico ya está en uso");
    }

    if (errorMessages.length) {
      res.status(HTTPCodes.BAD_REQUEST).send({ error: errorMessages });
    }

    await userServices.updUserEmail({
      id: id,
      newEmail: newEmail,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el correo.",
    });
  }
}

async function updateUserActive(req, res) {
  const { id, active, editor } = req.body;

  try {
    await userServices.changeUserActive({
      id: id,
      active: active,
      editor: editor,
    });

    res.send({
      success: true,
      id,
    });
  } catch (e) {
    res.status(HTTPCodes.INTERNAL_SERVER_ERROR).send({
      error: "No se pudo cambiar el estado.",
    });
  }
}

async function assignRole(req, res) {
  const { id_user, id_role } = req.body;

  try {
    await userServices.assignRole({
      id_user: id_user,
      id_role: id_role,
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
  const { id_user, id_role } = req.body;

  try {
    await userServices.removeRole({
      id_user: id_user,
      id_role: id_role,
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
