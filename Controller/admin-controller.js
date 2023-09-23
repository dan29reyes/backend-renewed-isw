const {
  getAdmins: get,
  DeleteAdmin: del,
  updateAdmin: update,
  registerAdmin: register,
  findExistingEmail: find,
  getStudents: student,
  getTeachers: teacher,
} = require("../Service/admin-services");

const { successResponse } = require("../Utils/responseBuilder");
const { isName, isEmail } = require("../Utils/validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function deleteAdmin(req, res) {
  const id = req.body.id;
  await del(id);
  res.status(200).send();
}

async function getAdmins(_, res) {
  const users = await get();
  res.send(users);
}

async function getTeachers(_, res) {
  const teachers = await teacher();
  res.send(teachers);
}

async function getStudents(_, res) {
  const students = await student();
  res.send(students);
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const users = req.body;

    await update(id, users.name);
    res.status(204).send();
  } catch (exception) {
    res.status(500).send("INTERNAL SERVER ERROR");
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

async function registerAdmin(req, res) {
  const user = req.body;

  const errorMessage = [];

  //Validaciones
  if (!user.name) {
    errorMessage.push("Parameter name is required");
  }
  if (!isName(user.name)) {
    errorMessage.push(
      "Name must be lowercase letters or uppercase letters only"
    );
  }
  if (!user.email) {
    errorMessage.push("Parameter email is required");
  }
  if (!user.role) {
    errorMessage.push("Role parameter is required");
  }
  if (!user.human_talent) {
    errorMessage.push(`The TH parameter is required`);
  }
  if (!user.active) {
    errorMessage.push(`Active parameter is required`);
  }

  if (!isEmail(user.email)) {
    errorMessage.push("Email must be a valid email address");
  }
  if (!user.password) {
    errorMessage.push("Parameter password is required");
  }

  const email_exists = await find(user.email);

  if (!email_exists) {
    errorMessage.push("This email exists!!");
  }

  if (errorMessage.length) {
    res.status(400).send(errorMessage);
  } else {
    const { encryptedPassword, salt } = encryptPassword(user.password);

    const role = user.role;
    const name = user.name;
    const email = user.email;
    const active = user.active;
    const human_talent = user.human_talent;

    const newuser = {
      human_talent,
      role,
      name,
      email,
      encryptedPassword,
      salt,
      active,
    };

    register(newuser);
    res.send(successResponse("OK"));
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const errorMessage = [];

    //Validaciones
    if (!email) {
      errorMessage.push("Parameter email is required");
    }
    if (!isEmail) {
      errorMessage.push("Email must be a valid email address");
    }
    if (!password) {
      errorMessage.push("Parameter password is required");
    }

    const email_exists = await find(email);

    if (email_exists[0].email != email) {
      errorMessage.push("Email does not exist");
    }
    if (errorMessage.length) {
      res.status(400).send(errorMessage);
    } else {
      const email_now = email_exists[0];
      const userEncryptedDetails = encryptPassword(password, email_now.salt);

      if (userEncryptedDetails.encryptedPassword === email_now.password) {
        const login_email = email_now.email;

        const accessToken = jwt.sign(
          {
            id: email_now.id,
            email: login_email,
            name: email_now.name,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1h",
          }
        );

        const refreshToken = jwt.sign(
          {
            email: login_email,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "30d",
          }
        );

        res.send({
          accessToken,
          refreshToken,
        });
      } else {
        res.status(401).send("Invalid email or password");
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  updateUser,
  deleteAdmin,
  getAdmins,
  loginUser,
  registerAdmin,
  getStudents,
  getTeachers,
};
