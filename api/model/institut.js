"use strict";

module.exports = (sequelize, DataTypes) => {
    const Institut = sequelize.define("Institut", {
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

    Institut.associate = function(models) {
        models.Institut.hasMany(models.Specialty, { onDelete: "cascade" });
    };

    return Institut;
};
