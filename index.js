const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

const app = express();
dbConnection();
app.use(cors());
// parseo de informacion
app.use(express.json());
// endpoints
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
// Puerto
app.listen(process.env.PORT, () => {
  console.log("server runing");
});
// directorio publico
app.use(express.static("public"));
