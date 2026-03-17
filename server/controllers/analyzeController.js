const fs = require("fs");
const ocrService = require("../services/ocrService");
const aiService = require("../services/aiService");

exports.analyzeResume = async (req, res) => {
  try {
    const filePath = req.file.path;
    const jobDesc = req.body.jobDesc;

    const resumeText = await ocrService.extractText(filePath);
    const analysis = await aiService.analyze(resumeText, jobDesc);

    fs.unlinkSync(filePath);

    res.json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analysis failed" });
  }
};