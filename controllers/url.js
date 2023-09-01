const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function generateShortURL(req, res) {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "url is required" });
  const shortID = nanoid(8);
  await URL.create({
    shortId: shortID,
    redirectURL: url,
    visitHistory: [],
  });

  return res.status(201).json({
    id: shortID,
  });
}

async function redirecttoOriginalURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
}

async function analytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateShortURL,
  redirecttoOriginalURL,
  analytics,
};
