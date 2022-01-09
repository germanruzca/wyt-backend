'use strict';

module.exports = function(sequelize, DataTypes) {
  const Token = sequelize.define(
    'Token',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, 
    {
      freezeTableName: true,
    }
  );

  return Token;
};