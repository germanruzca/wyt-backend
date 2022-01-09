const { User: User, Token: Token, sequelize: t } = require('../database');
const createError = require('http-errors');
const {jsonResponse} = require('../lib/erros/jsonError');
const bcrypt = require("bcrypt");

const { createAccessToken, createRefreshToken} = require('../lib/token')

const authController = {
  signUp: async (req, res, next) => {
    const user = req.body;
    const { username, password } = user;
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

        const exists = await User.findOne({where: { username: username }});
        if(exists) {
          next(createError(400, 'User already exists.'));
        } else {
          const accessToken = createAccessToken(username);
          const refreshToken = await createRefreshToken(username);

          await transaction.commit()

          res.json(jsonResponse(200, 
            {
              message: 'User created successfully',
              accessToken,
              refreshToken
            }
          ));
        }
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
    const {username, password} = req.body;
    try{
      const user = await User.findOne(
        {
          where: {
            username: username
          }
        });

      if(user){
          const isValidPassword = await bcrypt.compare(password, user.password);
          if(isValidPassword){
            const accessToken = createAccessToken(username);
            const refreshToken = await createRefreshToken(username);

            return res.json({
                message: "succes",
                accessToken, 
                refreshToken
            });
          }else{
              return next(new Error('username and/or password incorrect'));
          }
             
      }else{
          return next(new Error('user does not exist'));
      }

    }catch(err){
        console.log(err);
    }
  },
  logOut: async (req, res, next) => {
    const {refreshToken} = req.body;
    const transaction = await t.transaction();
    try{
        await Token.destroy({
          where: {
              token: refreshToken
            }
        },
        {
          transaction:transaction,
        });

        await transaction.commit();
        res.json({
            success: 'Token removed'
        });
    }catch(ex){
      await transaction.rollback();
      return next(new Error(`Error loging out the user ${ex}`));
    }
  },
  refreshToken: async (req, res, next) => {

  },
};

module.exports = authController;