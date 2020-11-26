import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dbConfig from "./database/db.js";
// import test from "./routes/demo.js";
import api from "./routes/userRoutes.js";

mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("database connected");
    },
    (error) => {
      console.log("db not connected", error);
    }
  );

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());

app.use("/public", express.static("public"));

app.use("/api", api);

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Port ${port}`);
});

app.use((req, res, next) => {
  setImmediate(() => {
    next(new Error("Something went wrong"));
  });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  res.status(err.statusCode).send(err.message);
});
