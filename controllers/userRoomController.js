const { UserRoom, Room } = require("../models");

const UserRoomController = {
  async getAllUserRooms(req, res) {
    try {
      const userRoom = await UserRoom.findAll();
      res.json(userRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async getAllUserRoomsByUser(req, res) {
    try {
      const userRooms = await UserRoom.findAll({
        where: { userId: req.params.userId },
        include: [
          {
            model: Room,
            as: "Rooms",
          },
        ],
      });

      res.json(userRooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async createUserRoom(req, res) {
    try {
      const { roomId, userId } = req.body;

      // Check if the roomId exists in the Rooms table
      const room = await Room.findOne({ where: { id: roomId } });
      if (!room) {
        return res
          .status(400)
          .json({ message: "Invalid roomId: Room does not exist" });
      }

      // Check if the UserRoom already exists
      const existingUserRoom = await UserRoom.findOne({
        where: { roomId, userId },
      });
      if (existingUserRoom) {
        return res
          .status(400)
          .json({
            message:
              "Ops! Parece que o usuário já faz parte desta sala. Tente convidar outro participante.",
          });
      }

      // Create the UserRoom record
      const userRoom = await UserRoom.create(req.body);
      res.status(201).json(userRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async updateUserRoom(req, res) {
    const { id } = req.params;
    try {
      await UserRoom.update(req.body, { where: { id } });
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async deleteUserRoom(req, res) {
    const { id } = req.params;
    try {
      await UserRoom.destroy({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = UserRoomController;
