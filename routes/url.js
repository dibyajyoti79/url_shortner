const express = require("express");
const { generateShortURL, analytics } = require("../controllers/url");
const router = express.Router();

router.post("/", generateShortURL);

router.get("/analytics/:shortId", analytics);

module.exports = router;
