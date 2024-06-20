const { Room, UserRoom } = require("../models");

const RoomController = {
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.findAll();
      res.json(rooms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async createRoom(req, res) {
    try {
      const room = await Room.create(req.body);
      await UserRoom.create({ userId: req.body.userId, roomId: room.id });
      res.status(201).json(room);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async updateRoom(req, res) {
    const { id } = req.params;
    try {
      await Room.update(req.body, { where: { id } });
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async deleteRoom(req, res) {
    const { id } = req.params;
    try {
      await Room.destroy({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async getRoomsByUserId(req, res) {
    const { userId } = req.params;
    try {
      const rooms = await Room.findAll({ where: { userId } });
      if (rooms.length > 0) {
        res.json(rooms);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = RoomController;
