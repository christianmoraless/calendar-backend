const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose
      .connect(
        "mongodb://christian:VQPVQMTgFJcitnOY@ac-xhcugzk-shard-00-00.uwxnkje.mongodb.net:27017,ac-xhcugzk-shard-00-01.uwxnkje.mongodb.net:27017,ac-xhcugzk-shard-00-02.uwxnkje.mongodb.net:27017/?ssl=true&replicaSet=atlas-12bwxb-shard-0&authSource=admin&retryWrites=true&w=majority",
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
