'use strict';

module.exports = function( sequelize, DataTypes) {
  let Type = sequelize.define(
    'Type',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
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