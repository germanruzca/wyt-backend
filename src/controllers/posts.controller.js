const { Post: Post, User: User, Type: Type, sequelize: t } = require('../database');
const {jsonResponse} = require('../lib/response/jsonResponse');

const postsController = {
  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.findAll({
        include: [{
          model:User,
          required: true,
        },
        {
          model: Type,
          required: true,
        }
        ]
      });

      res.json(jsonResponse(200, posts));

    } catch (error) {
      res.json(jsonResponse(500, error.message));
    }
  },
  getPostById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const post = await Post.findByPk(id,{
        include: [{
          model:User,
          required: true,
        },
        {
          model: Type,
          required: true,
        }
        ]
      });

      res.json(jsonResponse(200, post));

    } catch (error) {
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  createPost: async (req, res, next) => {
    const post = req.body;
    const transaction = await t.transaction();

    try {
      const postToCreate = await Post.create(post, {
        hooks: true,
        individualHooks: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json(jsonResponse(200, postToCreate));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  updatePost: async (req, res, next) => {
    const { id } = req.params.id;
    const post = req.body;

    const transaction = await t.transaction();

    try {
      const postToUpdate = await Post.update(post, {
        where: {
          id: id,
        },
        hooks: true,
        individualHooks: true,
        returning: true,
        transaction: transaction,
      });

      await transaction.commit();
      res.json(jsonResponse(200, postToUpdate));

    } catch (error) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  deletePost: async (req, res, next) => {
    const { id } = req.params;
    const transaction = await t.transaction();

    try {
      const postToDelete = await Type.destroy({
        where: {
          id: id,
        }
      }, {
        transaction: transaction
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

module.exports = postsController;