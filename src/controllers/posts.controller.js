const { Post: Post, sequelize: t } = require('../database')

const postsController = {
  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.findAll();

      res.json({status: 200, message: 'success', data: posts});
    } catch (error) {
      res.json({status:500, message: error.message, data: '[]'})
    }
  },
  getPostById: async (req, res, next) => {
    const { id } = req.params;

    try {
      const post = Post.findByPk(id);

      res.json({status:200, message: 'success', data: post});
    } catch (error) {
      res.json({status:500, message: error.message, data:'[]'})
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
      res.json({status:200, message:'success', data: postToCreate});
    } catch (error) {
      await transaction.rollback();
      res.json({status:500, message:error.message, data: '[]'});
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
      res.json({status: 200, message: 'success', data: postToUpdate});
    } catch (error) {
      await transaction.rollback();
      res.json({status:500, message:error.message, data: '[]'});
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
      res.json({status: 200, message: `The post with the id: ${id} was deleted`});
    } catch (error) {
      await transaction.rollback();
      res.json({status:500, message:error.message, data: '[]'});
    }
  },
};

module.exports = postsController;