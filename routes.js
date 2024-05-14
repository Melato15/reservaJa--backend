const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const { verifyToken } = require("./middlewares/authMiddleware");
const UserController = require("./controllers/userController");
const RoomController = require("./controllers/roomController");

router.post("/login", authController.login);

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.get("/rooms", RoomController.getAllRooms);
router.post("/rooms", RoomController.createRoom);
router.put("/rooms/:id", RoomController.updateRoom);
router.delete("/rooms/:id", RoomController.deleteRoom);

module.exports = router;
