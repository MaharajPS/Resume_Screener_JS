const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.analyze = async (resumeText, jobDesc) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a professional ATS Resume Evaluator.

Analyze the resume against the job description.

Resume:
${resumeText}

Job Description:
${jobDesc}

Return STRICT JSON only (no explanation, no markdown):

{
  "compatibility_score": number,
  "skill_match_percentage": number,
  "missing_skills": [],
  "suggestions": []
}
`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Remove markdown if Gemini wraps JSON in ```
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {
    console.error("GEMINI ERROR:", error);
    throw error;
  }
};