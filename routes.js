const express = require("express");
const router = express.Router();
const authController = require("./controllers/authController");
const { verifyToken } = require("./middlewares/authMiddleware");
const UserController = require("./controllers/userController");
const RoomController = require("./controllers/roomController");
const TableRoomController = require("./controllers/tableRoomController");
const UserReserveTableRoomController = require("./controllers/userReserveTableRoomController");
const UserRoomControoler = require("./controllers/userRoomController");

router.post("/login", authController.login);

router.get("/users", UserController.getAllUsers);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

router.get("/rooms", RoomController.getAllRooms);
router.get("/rooms/user/:userId", RoomController.getRoomsByUserId);
router.post("/rooms", RoomController.createRoom);
router.put("/rooms/:id", RoomController.updateRoom);
router.delete("/rooms/:id", RoomController.deleteRoom);

router.get("/tableRoom", TableRoomController.getAllTablesRoom);
router.post("/tableRoom", TableRoomController.createTableRoom);
router.put("/tableRoom/:id", TableRoomController.updateTableRoom);
router.delete("/tableRoom/:id", TableRoomController.deleteTableRoom);
router.get(
  "/tableRoom/user/:userId/date/:date/room/:roomId",
  TableRoomController.getAllTablesRoomByDateAndUser
);

router.get(
  "/userReserveTableRoom",
  UserReserveTableRoomController.getAllUserReserveTableRoom
);
router.post(
  "/userReserveTableRoom",
  UserReserveTableRoomController.createUserReserveTableRoom
);
router.put(
  "/userReserveTableRoom/:id",
  UserReserveTableRoomController.updateUserReserveTableRoom
);
router.delete(
  "/userReserveTableRoom/:id",
  UserReserveTableRoomController.deleteUserReserveTableRoom
);

router.get("/userRoom", UserRoomControoler.getAllUserRooms);
router.get("/userRoom/user/:userId", UserRoomControoler.getAllUserRoomsByUser);
router.post("/userRoom", UserRoomControoler.createUserRoom);
router.put("/userRoom/:id", UserRoomControoler.updateUserRoom);
router.delete("/userRoom/:id", UserRoomControoler.deleteUserRoom);

module.exports = router;
