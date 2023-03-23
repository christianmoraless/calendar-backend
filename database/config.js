const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose
      .connect(
        "mongodb://christianmorales:yOzVDBfx28XAL9Av@ac-ufc2ltz-shard-00-00.etzwvhz.mongodb.net:27017,ac-ufc2ltz-shard-00-01.etzwvhz.mongodb.net:27017,ac-ufc2ltz-shard-00-02.etzwvhz.mongodb.net:27017/?ssl=true&replicaSet=atlas-y1cdn1-shard-0&authSource=admin&retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("Connected successfully to MongoDB Atlas"));
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar bd");
  }
};

module.exports = {
  dbConnection,
};
