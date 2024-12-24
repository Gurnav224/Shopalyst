const mongoose = require("mongoose");

const connetDB = async () => {
  try {
    let connnectionUrl;

    console.log(process.env.NODE_ENV)

    if (process.env.NODE_ENV === "Production") {
      connnectionUrl = process.env.MONGODB;
    } else {
      connnectionUrl = process.env.localDB;
    }

    const connection = await mongoose.connect(connnectionUrl, {
      dbName: "EcommerceDB",
    });

    if (connection) {
      console.log(
        `successfully connected database`,
        connection.connection.host,
        connection.connection.db.databaseName
      );
    }
  } catch (error) {
    console.error("failed to connect database");
  }
};

module.exports = connetDB;
