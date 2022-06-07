
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
var user = process.env.DB_USER;
var password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${user}:${password}@cluster0.9fbetb1.mongodb.net/?retryWrites=true&w=majority`;


let db_context;
let dbConnection;

module.exports = {
  connectToServer: function () {

    MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }, (err, db) => {
        if (err || !db) {
          return err;
        }

        console.log("Conexion exitosa");

        db_context = db;


        //return callback();
      });
  },

  getDb: function (db_name) {
    //this.connectToServer()
    dbConnection = db_context.db(db_name);

    console.log("Successfully connected to MongoDB.");

    return dbConnection
  },
};
