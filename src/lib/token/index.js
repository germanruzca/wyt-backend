const jwt = require("jsonwebtoken");
const config = require('../../../config');
const constants = require('./constants')

const { actionSecret, refreshSecret } = config.service;

const { Token: Token, sequelize: t } = require('../../database');

const getTTL = (type) => {
  return constants.TTLS[type]
}

const createAccessToken = (username) => {
  const accessToken = jwt.sign(
    { 
      user: {
        username
      }
    },
    actionSecret,
    {
      expiresIn: getTTL("access")
    }
  );

  return accessToken;
}

const createRefreshToken = async (username) => {
  const refreshToken = jwt.sign(
    { 
      user: { 
        username 
      } 
    },
    refreshSecret,
    { 
      expiresIn: getTTL("refresh")
    }
  );

  try {
    const transaction = await t.transaction();
    const refreshTokenToCreate = await Token.create({token: refreshToken});

    await transaction.commit();
    return refreshToken;
  } catch (error) {
    await transaction.rollback();
    next(new Error('Error crating refresh token'));
  }
}

module.exports = { createAccessToken, createRefreshToken, getTTL };