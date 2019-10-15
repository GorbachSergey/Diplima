"use strict";

module.exports = (sequelize, DataTypes) => {
    const Specialty = sequelize.define("Specialty", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Specialty.associate = function(models) {
        models.Specialty.hasMany(models.Group, { onDelete: "cascade" });
    };

    return Specialty;
};
