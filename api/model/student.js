"use strict";

module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("Student", {
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
        }
    });

    Student.associate = function(models) {
        models.Student.hasMany(models.Mark, { onDelete: "cascade" });
    };

    return Student;
};
