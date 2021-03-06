const { User: User, Post: Post, sequelize: t } = require('../database');
const {jsonResponse} = require('../lib/response/jsonResponse');

const usersController  = {
  getUsers: async (req, res, next) => {
    try {

      const users = await User.findAll({
        include: [
          {model: Post},
        ]
      });
      res.json(jsonResponse(200, users));
    } catch (error) {
      res.json(jsonResponse(500, ''));
      next();
    }
  },
  getUserById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id,{
        include: [
          {model: Post},
        ]
      });
      if(!user) return res.json(jsonResponse(500, 'ID no exists.'));
      res.json(jsonResponse(200, user));
      
    } catch (error) {
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  createUser: async (req, res, next) => {
    const user = req.body;
    const transaction = await t.transaction();

    try {
      const userCreated = await User.create(user, {
        hooks: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json(jsonResponse(200, userCreated));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  updateUser: async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;
    const transaction = await t.transaction();
    try {
      const userUpdated = await User.update(user, {
        where: {
          id: id,
        },
        hooks: true,
        returning: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json(jsonResponse(200, userUpdated));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    
    const transaction = await t.transaction();

    try {
      const userToDelete = User.destroy({
        where: {
          id: id
        },
      },
      {
        transaction:transaction,
      });
      const postsToDelete = Post.destroy({
        where: {
          userId: id
        },
      },
      {
        transaction:transaction,
      });

      await transaction.commit();
      res.json(jsonResponse(200, id));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
};

module.exports = usersController;
