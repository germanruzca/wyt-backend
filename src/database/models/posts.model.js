'use strict';

module.exports = function( sequelize, DataTypes) {
  let  Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mediaTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mediaAuthor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      typeId: {
        type: DataTypes.UUID,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: false,
          fields: ['title']
        },
        {
          unique: false,
          fields: ['mediaTitle']
        }
      ]
    }
  );

  Post.associate = function (models) {
    Post.belongsTo(models.User, { 
      foreignKey: "userId"
    });

    Post.belongsTo(models.Type, { 
      foreignKey: "typeId" 
    });
  }

  return Post;
};