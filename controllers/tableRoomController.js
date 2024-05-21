const { TableRoom } = require("../models");

const tableRoomController = {
  async getAllTablesRoom(req, res) {
    try {
      const tableRoom = await TableRoom.findAll();
      res.json(tableRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async createTableRoom(req, res) {
    try {
      const tableRoom = await TableRoom.create(req.body);
      res.status(201).json(tableRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async updateTableRoom(req, res) {
    const { id } = req.params;
    try {
      await TableRoom.update(req.body, { where: { id } });
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async deleteTableRoom(req, res) {
    const { id } = req.params;
    try {
      await TableRoom.destroy({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = tableRoomController;
