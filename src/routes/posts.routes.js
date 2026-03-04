const express = require("express");
const router = express.Router();

const { create } = require("../controllers/posts.controller");
const { authRequired } = require("../middlewares/auth.middleware");

router.post("/posts", authRequired, create);

module.exports = router;