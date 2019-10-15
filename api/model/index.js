const Fs = require("fs");
const Path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("diploma", "root", "", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});
const db = {};

// Read all the files in this directory and import them as models
Fs.readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf(".") !== 0 &&
            file !== 'index.js' &&
            file.slice(-3) === ".js"
        );
    })
    .forEach(file => {
        var model = sequelize["import"](Path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
