const mongoose = require("mongoose");

const connetDB = async () => {
  try {
    const  urlObjects = {
      production:process.env.MONGODB,
      development:process.env.localDB
    };

    const mode = process.argv[2];


    const connection = await mongoose.connect(process.env.MONGODB , {
      dbName: "EcommerceDB",
    });

    if (connection) {
      console.log(
        `successfully connected to 🔗 database ⚙️`,
        connection.connection.host ,
        connection.connection.db.databaseName
      );
    }
  } catch (error) {
    console.error("failed to connect database");
  }
};

module.exports = connetDB;
