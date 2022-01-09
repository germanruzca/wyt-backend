'use strict';

module.exports = function(sequelize, DataTypes) {
  const Auth = sequelize.define(
    'Auth',
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
    }
  );

  return Auth;
};