"use strict";

module.exports = (sequelize, DataTypes) => {
    const Enrolment = sequelize.define("Enrolment", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        }
    });

    return Enrolment;
};
