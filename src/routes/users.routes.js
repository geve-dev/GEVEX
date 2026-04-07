const express = require("express");
const userController = require("../controllers/users.controller");
const { authRequired } = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/:id", authRequired, userController.me);
router.put("/:id", authRequired, userController.updateById);

module.exports = router;