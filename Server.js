// Modules
import express from "express";
import mongoose from "mongoose";
import router from "./Routers/Router.js";

// Configs
const app = express();
app.listen(3000);

app.use(express.json());

mongoose.connect(
  "",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(router);
