const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const app = express();
dbConnection();
// parseo de informacion
app.use(express.json());
// endpoints
app.use("/api/auth", require("./routes/auth"));

// Puerto
app.listen(process.env.PORT, () => {
  console.log("server runing");
});

// directorio publico
app.use(express.static("public"));
