require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = 9000;

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));
const fs = require("fs");
const https = require("https");

// const file = fs.readFileSync("./CF59AF1F4E14484296D82C851AB9719F.txt")
const key = fs.readFileSync("private.key");
const cert = fs.readFileSync("certificate.crt");

const cred = {
  key,
  cert,
};

//ADMIN
const UserRegisterRoute = require("./routers/admin/adminUserRegister");
const CreatePackageRoute = require("./routers/admin/adminCreatePackage");
const FetchPackagesRoute = require("./routers/admin/adminFetchPackages");
const countClientRoute = require("./routers/admin/adminClientCount");
const adminFoodtastingRouter = require("./routers/admin/adminFoodTasting");
const adminFetchMeetingRouter = require("./routers/admin/adminFetchMeetings");
const adminNetSalesRouter = require("./routers/admin/adminNetSalesTotal");
const adminDishes = require("./routers/admin/adminDish");
const adminPackage = require("./routers/admin/adminPackage");
const adminCoverage = require("./routers/admin/adminCoverage");
const adminEmployee = require("./routers/admin/adminEmployee");
const adminGallery = require("./routers/admin/adminGallery");
const adminFetchDishes = require("./routers/admin/adminFetchDishes");
const adminFetchCities = require("./routers/admin/adminFetchCities");
const adminFbInformation = require("./routers/admin/adminFbInformation");

//CLIENT
const clientEventRoute = require("./routers/client/clientEventRouter");
const clientEditEventRoute = require("./routers/client/clientEditEventRouter");
const clientFetchEventRoute = require("./routers/client/clientFetchEvent");
const clientAddOnsRoute = require("./routers/client/clientAddOnsRouter");
const clientFetchInvoiceRoute = require("./routers/client/clientFetchInvoice");
const clientFTFormRoute = require("./routers/client/ClientFTForm");
const clientOLFormRoute = require("./routers/client/clientOLForm");
const clientFetchFtRoute = require("./routers/client/clientFetchFT");
const clientFetchOlRoute = require("./routers/client/clientFetchOL");
const clientDashBoard = require("./routers/client/clientDashboard");
const clientPayment = require("./routers/client/clientPayment");
const clientFetchAppointment = require("./routers/client/clientFetchAppointment");
const clientUserLogin = require("./routers/client/clientUserLogin");


// BOTH
//const loginUser = require("./routers/loginRouter");
const loginUser = require("./routers/loginRouter");
const AvailableDate = require("./routers/admin/adminCreateAvailability")

app.use("/api", UserRegisterRoute);
app.use("/api", CreatePackageRoute);

app.use("/api", clientEventRoute);

app.use("/api", clientEditEventRoute);
app.use("/api", clientFetchEventRoute);

app.use("/api", loginUser);

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
app.use("/api", adminCoverage);
app.use("/api", adminGallery);
app.use("/api", adminFbInformation);

app.use("/api", adminDishes);
app.use("/api", adminPackage);
app.use("/api", adminEmployee);
app.use("/api", clientDashBoard);

app.use("/api", clientPayment);
app.use("/api", adminFetchDishes);
app.use("/api", adminFetchCities);
app.use("/api", clientFetchAppointment);
app.use("/api", clientUserLogin);

// app.get("/.well-known/pki-validation/CF59AF1F4E14484296D82C851AB9719F.txt", (req,res) =>{
//   res.sendFile("/home/ubuntu/foodBud-BE/CF59AF1F4E14484296D82C851AB9719F.txt")
// })

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});

const httpsServer = https.createServer(cred, app);
httpsServer.listen(9002);
