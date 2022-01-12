'use strict';

module.exports = function( sequelize, DataTypes) {
  const Type = sequelize.define(
    'Type',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ['name']
        }
      ]
    }
  );

  Type.associate = function(models) {
    Type.hasMany(models.Post, { 
      foreignKey: 'typeId'
    });
  }

  return Type;
};