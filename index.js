const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());
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

app.listen(3001 , () => {
  console.log("Server started!");
});