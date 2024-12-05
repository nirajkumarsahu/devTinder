const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:AYSjTw5Z9HEpqhPU@namastenode.erlnp.mongodb.net/devTinder"
  );
};

module.exports = connectDb;
