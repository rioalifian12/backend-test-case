const express = require("express");
const memberController = require("../controllers/member.controller");

const router = express.Router();

router.get("/", memberController.getAllMember);

module.exports = router;
