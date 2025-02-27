const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:AYSjTw5Z9HEpqhPU@namastenode.erlnp.mongodb.net/devTinder"
  );
};

module.exports = connectDb;

// const connectDB = async () => {
//   console.log(process.env.DB_CONNECTION_SECRET);
//   await mongoose.connect(process.env.DB_CONNECTION_SECRET);
// };
