require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const UserRegisterRoute = require("./routers/admin/adminUserRegister");
const CreatePackageRoute = require("./routers/admin/adminCreatePackage");

app.use("/api", UserRegisterRoute);
app.use("/api", CreatePackageRoute);

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});