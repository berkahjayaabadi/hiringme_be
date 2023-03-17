const express = require("express");
const router = express();
//import controller=
const companyController = require("../controller/company.controller");
const formUpload = require("../helper/upload");

router.get("/",  companyController.get);
router.get("/:id", companyController.getDetail);
router.patch("/:id", formUpload.single("image"), companyController.update);
router.delete("/:id", companyController.remove);

module.exports = router;
