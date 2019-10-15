"use strict";

module.exports = (sequelize, DataTypes) => {
    const Mark = sequelize.define("Mark", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    mark: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    countOfPass: {
        type: DataTypes.INTEGER(3)
    }
});


    // Subject.associate = function(models) {
    //         models.Subject.hasMany(models.Student, { onDelete: "cascade" });
    //     };

    return Mark;
};
