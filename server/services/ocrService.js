const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

exports.extractText = async (filePath) => {
  const formData = new FormData();
  formData.append("apikey", process.env.OCR_API_KEY);
  formData.append("file", fs.createReadStream(filePath));

  const response = await axios.post(
    "https://api.ocr.space/parse/image",
    formData,
    { headers: formData.getHeaders() }
  );

  console.log("OCR FULL RESPONSE:", response.data); // Debug log

  if (
    response.data.ParsedResults &&
    response.data.ParsedResults.length > 0
  ) {
    return response.data.ParsedResults[0].ParsedText;
  } else {
    throw new Error(
      "OCR failed: " + JSON.stringify(response.data)
    );
  }
};