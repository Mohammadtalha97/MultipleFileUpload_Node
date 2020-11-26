import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
// import upload from "../upload/upload.js";

const router = express.Router();

const DIR = "./public";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    // const filename = file.originalName.toLowerCase().split("").join("-");
    const filename = file.originalName;
    cb(null, uuidv4() + "-" + filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg, .jpe fromat allowed"));
    }
  },
});

//User Model

router.post(
  "/upload-images",
  upload.array("imgCollection", 8),
  (req, res, next) => {
    // console.log("req.protocol", req.protocol);
    // console.log("req host", req.get("host"));
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/public/" + req.files[i].filename);
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      imgCollection: reqFiles,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "Done Upload!",
          userCreated: {
            _id: result._id,
            imgCollection: result.imgCollection,
          },
        });
      })
      .catch((err) => {
        console.log("error-->", error);
        res.status(500).json({
          error: err,
        });
      });
  }
);

router.get("/", (req, res, next) => {
  User.find().then((data) => {
    res.status(200).json({
      message: "User list retrived successfully",
      users: data,
    });
  });
});

export default router;
