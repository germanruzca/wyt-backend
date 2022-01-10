const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const { User: User, Token: Token, sequelize: t } = require("../database");
const { jsonResponse } = require("../lib/response/jsonResponse");
const {
  createAccessToken,
  createRefreshToken,
  getTTL,
} = require("../lib/token");
const { service } = require("../../config/index");
const { refreshSecret, actionSecret } = service;

const authController = {
  signUp: async (req, res, next) => {
    const user = req.body;
    const { username, password } = user;
    user.isActive = true;
    user.typeUser = true;

    const transaction = await t.transaction();

    if (!username || !password) {
      next(createError(400, "Missing username or password"));
    } else if (username && password) {
      try {
        const userToCreate = await User.create(user, {
          hooks: true,
          individualHooks: true,
          transaction: transaction,
        });

        const exists = await User.findOne({ where: { username: username } });
        if (exists) {
          next(createError(400, "User already exists."));
        } else {
          const accessToken = createAccessToken(username);
          const refreshToken = await createRefreshToken(username);

          await transaction.commit();
          res.json(
            jsonResponse(200, {
              message: "User created successfully",
              accessToken,
              refreshToken,
            })
          );

        }
      } catch (error) {
        await transaction.rollback();
        res.json(
          jsonResponse(500, {
            message: `User not created ${error.message}`,
          })
        );
        next();
      }
    }
  },
  logIn: async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          username: username,
        },
      });

      if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          const accessToken = createAccessToken(username);
          const refreshToken = await createRefreshToken(username);

          return res.json(jsonResponse(200, 
            {
              message: "Loged in",
              accessToken,
              refreshToken,
            }
          ));
        } else {
          return next(createError(400, "username and/or password incorrect"));
        }
      } else {
        return next(createError(400, "User does not exists."));
      }
    } catch (error) {
      res.json(jsonResponse(500, error.message));
      next();
    }
  },
  logOut: async (req, res, next) => {
    const { refreshToken } = req.body;
    const transaction = await t.transaction();
    try {
      await Token.destroy(
        {
          where: {
            token: refreshToken,
          },
        },
        {
          transaction: transaction,
        }
      );

      await transaction.commit();
      res.json(jsonResponse(200, {
        message: "Token removed",
      }));
    } catch (ex) {
      await transaction.rollback();
      res.json(jsonResponse(500, error.message))
      next();
    }
  },
  refreshToken: async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return next(createError(400, "No token provided"));
    }

    try {
      const tokenToChange = await Token.findOne({
        where: {
          token: refreshToken,
        },
      });
      if (!tokenToChange) {
        return next(createError(400, "No token found"));
      }
      const payload = jwt.verify(tokenToChange.token, refreshSecret);
      const accessToken = jwt.sign(
        {
          user: payload,
        },
        actionSecret,
        {
          expiresIn: getTTL("access"),
        }
      );

      res.json(jsonResponse(200, {
        message: 'acces token refreshed',
        accessToken,
      }));
    } catch (err) {
      res.json(jsonResponse(500, error.message));
       next();
    }
  },
};

module.exports = authController;
