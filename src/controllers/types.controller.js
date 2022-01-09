const { Type: Type, sequelize: t } = require('../database');

const typesController = {
  getTypes: async (req, res, next) => {
    try {
      const types = await Type.findAll();
      res.json({
        status: 200,
        message: types
      });
    } catch (error) {
      res.json({
        status: 500,
        message: error.message
      });
    }
  },
  getTypeById: async (req, res, next) => {
    const { id } = req.params
    try {
      const type = await Type.findByPk(id);
      res.json({
        status: 200,
        message: type
      });
    } catch (error) {
      res.json({
        status: 500,
        message: error.message
      });
    }
  },
  createType: async (req, res, next) => {
    const type = req.body;
    const transaction = await t.transaction();
    try {
      const typeToCreate = await Type.create(type, {
        hooks: true,
        individualHooks: true,
        transaction: transaction,
      });
      
      await transaction.commit();
      res.json({status: 200, message: typeToCreate});
    } catch (error) {
      await transaction.rollback();
      res.json({
        status: 500, 
        message: error.message
      })
    }
  },
  updateType: async (req, res, next) => {
    const { id } = req.params;
    const type = req.body;

    const transaction = await t.transaction();
    try {
      const typeToUpdate = await Type.update(type, {
        where: {
          id: id,
        },
        hooks: true,
        individualHooks: true,
        returning: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json({
        status: 200,
        message: typeToUpdate,
      })
    } catch (error) {
      await transaction.rollback();
      res.json({status: 500, message: error.message})
    }
  },
  deleteType: async (req, res, next) => {
    const { id } = req.params;

    const transaction = await t.transaction();

    try {
      const typeToDelete = await Type.destroy({
        where: {
          id: id,
        }
      }, {
        trasaction: transaction,
      });

      await transaction.commit();
      res.json({status: 500, message:`The type with the id: ${id} was deleted`});
    } catch (error) {
      await transaction.rollback();
      res.json({status: 500, message: error.message})
    }
  }
};

module.exports = typesController;