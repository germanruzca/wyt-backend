const { Type: Type, sequelize: t } = require('../database');
const { jsonResponse } = require('../lib/response/jsonResponse');

const typesController = {
  getTypes: async (req, res, next) => {
    try {
      const types = await Type.findAll();

      res.json(jsonResponse(200, types));

    } catch (error) {
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  getTypeById: async (req, res, next) => {
    const { id } = req.params
    try {
      const type = await Type.findByPk(id);

      res.json(jsonResponse(200, type));

    } catch (error) {
      res.json(jsonResponse(500, error.message));
      next();
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
      res.json(jsonResponse(200, typeToCreate));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
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
      res.json(jsonResponse(200, typeToUpdate));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
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
      res.json(jsonResponse(200, id));
      
    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
    }
  }
};

module.exports = typesController;