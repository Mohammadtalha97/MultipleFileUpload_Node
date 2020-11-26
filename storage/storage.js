import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, res, cb) => {
    const filename = file.originalName.toLowerCase().split("").join("-");
    cb(null, uuidv4() + "-" + filename);
  },
});

export default storage;
