"use strict";

module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define("Subject", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Subject.associate = function(models) {
        models.Subject.belongsToMany(models.Teacher, { through: models.Enrolment });
        models.Subject.hasMany(models.Mark, { onDelete: "cascade" });
    };

    return Subject;
};
