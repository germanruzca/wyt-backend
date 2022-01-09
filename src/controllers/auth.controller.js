const { User: User, sequelize: t } = require('../database');
const createError = require('http-errors');
const {jsonResponse} = require('../lib/erros/jsonError');

const authController = {
  signUp: async (req, res, next) => {
    const user = req.body;
    user.isActive = true ;
    user.typeUser = true;

    const transaction = await t.transaction();

    if (!username || !password) {
      next(createError(400, 'Missing username or password'));
    } else  if(username && password) {
      try {
        const userToCreate = await User.create(user, {
          hooks: true,
          individualHooks: true,
          transaction: transaction
        });
        await transaction.commit()
        
        res.json(jsonResponse(200, 
          {
            message: 'User created successfully',
          }
        ));
      } catch (error) {
        await transaction.rollback();

        res.json(jsonResponse(500, 
          {
            message: `User not created ${error}`,
          }
        ));
      }
    }
  },
  logIn: async (req, res, next) => {
    
  },
  logOut: async (req, res, next) => {

  },
  refreshToken: async (req, res, next) => {

  },
};

module.exports = authController;