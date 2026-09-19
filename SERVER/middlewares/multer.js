import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    const isPdf =
      file.mimetype === "application/pdf" ||
      /\.pdf$/i.test(file.originalname);

    if (!isPdf) {
      return cb(new Error("Only PDF files are allowed"));
    }

    cb(null, true);
  },
});

export default upload;


