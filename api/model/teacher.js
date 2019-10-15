"use strict";

module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define("Teacher", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Teacher.associate = function(models) {
        models.Teacher.belongsToMany(models.Subject, { through: models.Enrolment });
    };

    return Teacher;
};
