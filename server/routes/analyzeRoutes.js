const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const { analyzeResume } = require("../controllers/analyzeController");

router.post("/analyze", upload.single("resume"), analyzeResume);

module.exports = router;