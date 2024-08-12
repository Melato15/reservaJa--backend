const { Room, UserRoom } = require("../models");
const logger = require('../logger');

const RoomController = {
  async getAllRooms(req, res) {
    logger.debug("GET /rooms - Iniciando busca por todas as salas");
    try {
      const rooms = await Room.findAll();
      logger.info("GET /rooms - Salas encontradas:", { rooms });
      res.json(rooms);
    } catch (error) {
      logger.error("GET /rooms - Erro ao buscar salas:", { error });
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async createRoom(req, res) {
    logger.debug("POST /rooms - Iniciando criação de sala com dados:", { body: req.body });
    try {
      const room = await Room.create(req.body);
      logger.info("POST /rooms - Sala criada:", { room });
      await UserRoom.create({ userId: req.body.userId, roomId: room.id });
      logger.info("POST /rooms - Associação de sala e usuário criada com sucesso");
      res.status(201).json(room);
    } catch (error) {
      logger.error("POST /rooms - Erro ao criar sala:", { error });
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async updateRoom(req, res) {
    const { id } = req.params;
    logger.debug(`PUT /rooms/${id} - Iniciando atualização da sala com dados:`, { body: req.body });
    try {
      await Room.update(req.body, { where: { id } });
      logger.info(`PUT /rooms/${id} - Sala atualizada com sucesso`);
      res.status(200).json({ message: "Sala atualizada com sucesso" });
    } catch (error) {
      logger.error(`PUT /rooms/${id} - Erro ao atualizar sala:`, { error });
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },


  async deleteRoom(req, res) {
    const { id } = req.params;
    logger.debug(`DELETE /rooms/${id} - Iniciando exclusão da sala`);
    try {
      await Room.destroy({ where: { id } });
      logger.info(`DELETE /rooms/${id} - Sala deletada com sucesso`);
      res.status(200).json({ message: "Sala deletada com sucesso" });
    } catch (error) {
      logger.error(`DELETE /rooms/${id} - Erro ao deletar sala:`, { error });
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async getRoomsByUserId(req, res) {
    const { userId } = req.params;
    logger.debug(`GET /rooms/user/${userId} - Iniciando busca de salas para usuário`);
    try {
      const rooms = await Room.findAll({ where: { userId } });
      if (rooms.length > 0) {
        logger.info(`GET /rooms/user/${userId} - Salas encontradas para usuário:`, { rooms });
        res.json(rooms);
      } else {
        logger.warn(`GET /rooms/user/${userId} - Nenhuma sala encontrada para o usuário`);
        res.status(404).json({ message: "Nenhuma sala encontrada para o usuário" });
      }
    } catch (error) {
      logger.error(`GET /rooms/user/${userId} - Erro ao buscar salas para usuário:`, { error });
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = RoomController;
