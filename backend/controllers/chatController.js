const translate = require("@vitalets/google-translate-api");

exports.chat = async (req, res) => {
  const { message, lang } = req.body;

  try {
    const translated = await translate(message, { to: lang || "en" });

    res.json({
      original: message,
      translated: translated.text
    });
  } catch (err) {
    res.json({ error: "Translation failed" });
  }
};