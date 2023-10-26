const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

const allowedOrigins = ['Access-Control-Allow-Origin',"http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
      console.log("allowed")
    } else {
      console.log("error");
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const usersRouter = require("./Routes/users-routes")
const rolesRouter = require("./Routes/roles-routes")
const privilegesRouter = require("./Routes/privileges-routes")
const patientsRouter = require("./Routes/patients.routes")
const modulesRouter = require("./Routes/modules-routes")
const courseRouter = require("./Routes/course-routes")
const clinicRouter = require("./Routes/clinics-routes")
const announceRouter = require("./Routes/announce-routes")

app.use("/users", usersRouter);
app.use("/roles", rolesRouter);
app.use("/privileges", privilegesRouter);
app.use("/patients", patientsRouter);
app.use("/modules", modulesRouter);
app.use("/courses", courseRouter);
app.use("/clinics", clinicRouter);
app.use("/announces", announceRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server started!");
});
