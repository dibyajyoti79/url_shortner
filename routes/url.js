const express = require("express");
const {
  generateShortURL,
  analytics,
  redirecttoOriginalURL,
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateShortURL);
router.get("/:shortId", redirecttoOriginalURL);
router.get("/analytics/:shortId", analytics);

module.exports = router;
