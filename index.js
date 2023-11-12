require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

//ADMIN
const UserRegisterRoute = require("./routers/admin/adminUserRegister");
const CreatePackageRoute = require("./routers/admin/adminCreatePackage");
const FetchPackagesRoute = require("./routers/admin/adminFetchPackages")
const countClientRoute = require("./routers/admin/adminClientCount")

//CLIENT
const clientEventRoute = require("./routers/client/clientEventRouter");
const clientEditEventRoute = require("./routers/client/clientEditEventRouter");
const clientFetchEventRoute = require("./routers/client/clientFetchEvent");
const clientAddOnsRoute = require("./routers/client/clientAddOnsRouter")
const clientFetchInvoiceRoute = require("./routers/client/clientFetchInvoice")
const clientFTFormRoute = require("./routers/client/ClientFTForm")
const clientOLFormRoute = require("./routers/client/clientOLForm")

// BOTH
const loginUserRoute = require("./routers/loginRouter");


app.use("/api", UserRegisterRoute);
app.use("/api", CreatePackageRoute);
app.use("/api", clientEventRoute);
app.use("/api", clientEditEventRoute);
app.use("/api", clientFetchEventRoute);
app.use("/api", loginUserRoute);
app.use("/api", clientAddOnsRoute);
app.use("/api", clientFetchInvoiceRoute);
app.use("/api", clientFTFormRoute);
app.use("/api", clientOLFormRoute);
app.use("/api", FetchPackagesRoute)
app.use("/api", countClientRoute)


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
