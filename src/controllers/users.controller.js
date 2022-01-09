const { User: User, sequelize: t } = require('../database');

const usersController  = {
  getUsers: async (req, res, next) => {
    try {

      const result = await User.findAll();
      res.json({status: 200, result: result});

    } catch (error) {

      res.json({status: 500, message: error})
    }
  },
  getUserById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      res.json({status: 200, message: user});

    } catch (error) {
      res.json({status: 500, message: error});
    }
  },
  createUser: async (req, res, next) => {
    const user = req.body;
    const transaction = await t.transaction();

    try {
      const userCreated = await User.create(user, {
        hooks: true,
        individualHooks: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json({status: 200, message: userCreated});

    } catch (error) {
      await transaction.rollback();
      res.json({status: 500, message: error});
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
        individualHooks: true,
        returning: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json({status:200, message:userUpdated});

    } catch (error) {
      await transaction.rollback();
      res.json({status:500, message:error});
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

      await transaction.commit();
      res.json({status: '200',message: `User with the id: ${id} deleted`});

    } catch (error) {
      await transaction.rollback();
      res.json({status: '500',message:"The user was not deleted."});
    }
  },
};

module.exports = usersController;
