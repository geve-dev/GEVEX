const express = require("express");
const { me } = require("../controllers/users.controller");
const { authRequired }  = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/:id", authRequired, me);

module.exports = router;