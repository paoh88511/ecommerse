require("dotenv").config();

const mongoose = require("mongoose");

// const connectionStr =
//   "mongodb+srv://321:321@cluster0.j7ampxa.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlparser: true })
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log(err));

mongoose.connection.on("error", (err) => {
  console.log(err);
});
