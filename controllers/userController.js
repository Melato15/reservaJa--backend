const { User } = require("../models");

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    try {
      await User.update(req.body, { where: { id } });
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await User.destroy({ where: { id } });
      res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  },
};

module.exports = UserController;
