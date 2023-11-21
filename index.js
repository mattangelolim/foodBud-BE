require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
const fs = require("fs")
const https = require("https")

const file = fs.readFileSync("./CF59AF1F4E14484296D82C851AB9719F.txt")

//ADMIN
const UserRegisterRoute = require("./routers/admin/adminUserRegister");
const CreatePackageRoute = require("./routers/admin/adminCreatePackage");
const FetchPackagesRoute = require("./routers/admin/adminFetchPackages");
const countClientRoute = require("./routers/admin/adminClientCount");
const adminFoodtastingRouter = require("./routers/admin/adminFoodTasting");
const adminFetchMeetingRouter = require("./routers/admin/adminFetchMeetings");
const adminNetSalesRouter = require("./routers/admin/adminNetSalesTotal");

//CLIENT
const clientEventRoute = require("./routers/client/clientEventRouter");
const clientEditEventRoute = require("./routers/client/clientEditEventRouter");
const clientFetchEventRoute = require("./routers/client/clientFetchEvent");
const clientAddOnsRoute = require("./routers/client/clientAddOnsRouter");
const clientFetchInvoiceRoute = require("./routers/client/clientFetchInvoice");
const clientFTFormRoute = require("./routers/client/ClientFTForm");
const clientOLFormRoute = require("./routers/client/clientOLForm");
const clientFetchFtRoute = require("./routers/client/clientFetchFT");
const clientFetchOlRoute = require("./routers/client/clientFetchOL")

// BOTH
const loginUserRoute = require("./routers/loginRouter");
const AvailableDate = require("./routers/admin/adminCreateAvailability")

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
app.use("/api", FetchPackagesRoute);
app.use("/api", countClientRoute);
app.use("/api", adminFoodtastingRouter);
app.use("/api", adminFetchMeetingRouter);
app.use("/api", adminNetSalesRouter);
app.use("/api", AvailableDate);
app.use("/api", clientFetchFtRoute);
app.use("/api", clientFetchOlRoute);

app.get("/.well-known/pki-validation/CF59AF1F4E14484296D82C851AB9719F.txt", (req,res) =>{
  res.sendFile("/home/ubuntu/foodBud-BE/CF59AF1F4E14484296D82C851AB9719F.txt")
})

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
