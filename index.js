const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

const allowedOrigins = ['Access-Control-Allow-Origin', "http://localhost:3000"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const adminRouter = require("./Route/admin-routes");
const sectionRouter = require("./Route/section-routes");
const modulosRouter = require("./Route/modules-routes");
const userRouter = require("./Route/users-routes");
const mailRouter = require("./Route/mail-routes");

app.use("/admins", adminRouter);
app.use("/sections", sectionRouter);
app.use("/modulos", modulosRouter);
app.use("/user", userRouter);
app.use("/mail", mailRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server started!");
});