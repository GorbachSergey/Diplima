"use strict";

module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define("Group", {
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
        course: {
            type: DataTypes.STRING(10),
            allowNull: false
        }
    });

   Group.associate = function(models) {
        models.Group.hasMany(models.Student, { onDelete: "cascade" });
        models.Group.hasMany(models.Subject, { onDelete: "cascade" });
    };

    return Group;
};
