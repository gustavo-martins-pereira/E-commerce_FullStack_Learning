'use strict';
const {
    Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasMany(models.Product, { foreignKey: "ownerId" });
        }
    }
    User.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Username is required",
                },
                notEmpty: {
                    msg: "Username cannot be empty",
                },
                len: {
                    args: [5, 50],
                    msg: "Username must be between 5 and 50 characters long",
                },
                is: {
                    args: /^[a-zA-Z0-9]+$/i,
                    msg: "Username can only contain letters and numbers",
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: "Username is required",
                },
                notEmpty: {
                    msg: "Password cannot be empty",
                },
                len: {
                    args: [8, 255],
                    msg: "Password must be between 8 and 50 characters long",
                },
            },
        },
        role: {
            type: DataTypes.ENUM("USER", "SELLER"),
            allowNull: false,
            defaultValue: "USER",
            validate: {
                notNull: {
                    msg: "Username is required",
                },
                isIn: {
                    args: [["USER", "SELLER"]],
                    msg: "Role must be USER or SELLER",
                },
            },
        },
    }, {
        sequelize,
        modelName: "User",
        tableName: "users",
        underscored: true,
    });
    return User;
};