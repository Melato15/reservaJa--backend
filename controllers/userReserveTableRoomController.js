const { UserReserveTableRoom, User, Room } = require("../models");

const UserReserveTableRoomController = {
  async getAllUserReserveTableRoom(req, res) {
    try {
      const userReserveTableRoom = await UserReserveTableRoom.findAll({
        include: [
          {
            model: User,
            attributes: ["id", "name", "email"], // Adicione os atributos que você deseja incluir
          },
          {
            model: Room,
            attributes: ["id", "name"], // Adicione os atributos que você deseja incluir
          },
        ],
      });
      res.json(userReserveTableRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async createUserReserveTableRoom(req, res) {
    try {
      const userReserveTableRoom = await UserReserveTableRoom.create(req.body);
      res.status(201).json(userReserveTableRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async updateUserReserveTableRoom(req, res) {
    const { id } = req.params;
    try {
      await UserReserveTableRoom.update(req.body, { where: { id } });
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async deleteUserReserveTableRoom(req, res) {
    const { id } = req.params;
    try {
      await UserReserveTableRoom.destroy({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = UserReserveTableRoomController;
