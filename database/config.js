const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose
      .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected successfully to MongoDB Atlas"));
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar bd");
  }
};

module.exports = {
  dbConnection,
};
