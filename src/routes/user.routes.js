const express = require("express");
const router = express();
//import controller=
const userController = require("../controller/user.controller");
const formUpload = require("../helper/upload");

router.get("/",userController.get);
router.get("/:id", userController.getDetail);
router.patch("/:id", formUpload.single("image"), userController.update);
router.delete("/:id", userController.remove);

module.exports = router;
