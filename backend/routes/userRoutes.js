const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const { getUsers , getUserById , deleteUser } = require("../controllers/userController")

const router = express.Router();

//User Management Roles
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, adminOnly, deleteUser);

module.exports = router;
