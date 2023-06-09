const mongoose = require("mongoose");

const CONNECTION_URL = process.env.CONNECTION_URL;

exports.connect = async function connectToDB(callback) {
  try {
    await mongoose.connect(CONNECTION_URL);
    callback(mongoose.connection, null);
  } catch (err) {
    const error = new Error(`Could not connect to DB :\n ${err}`);
    callback(null, error);
  }
};
