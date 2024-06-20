const { TableRoom, UserReserveTableRoom, User } = require("../models");

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

  async getAllTablesRoomByDateAndUser(req, res) {
    try {
      const { date, roomId } = req.params;

      // Busca todas as salas de mesa
      const tableRooms = await TableRoom.findAll();

      // Busca todas as reservas do usuário para a data e sala específicas
      const userReserveTableRooms = await UserReserveTableRoom.findAll({
        where: { date, roomId },
      });

      // Itera sobre as salas de mesa e marca as ocupadas
      const result = await Promise.all(
        tableRooms.map(async (tableRoom) => {
          // Encontra a reserva correspondente a esta sala de mesa
          const reserve = userReserveTableRooms.find(
            (reserve) => reserve.tableRoomId === tableRoom.id
          );

          let user = null;
          if (reserve) {
            // Se houver reserva, busca o usuário associado
            user = await User.findOne({
              where: { id: reserve.userId },
            });
          }

          return {
            ...tableRoom.dataValues,
            ocupado: reserve !== undefined, // Marca como ocupado se houver reserva
            user: user || null, // Retorna o usuário encontrado ou null se não houver reserva
          };
        })
      );

      res.json(result);
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
