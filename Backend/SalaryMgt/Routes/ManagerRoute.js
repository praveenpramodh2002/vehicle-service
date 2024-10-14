const express = require("express");
const router = express.Router();

const ManagerController = require("../Controllers/ManagerController");

router.get("/",ManagerController.getAllManagers);
router.post("/",ManagerController.addManagers);
router.delete("/:id",ManagerController.deleteManager);
router.get("/:id",ManagerController.getManagerById);
router.post("/login", ManagerController.loginManager);
router.post("/verify-otp", ManagerController.verifyOTP);


module.exports = router;