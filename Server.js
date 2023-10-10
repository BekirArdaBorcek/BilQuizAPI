// Modules
import express from "express";
import mongoose from "mongoose";
import router from "./Routers/Router.js";

// Configs
const app = express();
app.listen(3000);

app.use(express.json());

mongoose.connect(
  "mongodb+srv://Vincent:6563001109aA@bilquiz.cujxgnd.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(router);
