const model = require("../model");

exports.getInstituts = function(request, response) {
    model.Institut.findAll({ raw: true })
        .then(instituts => {
            response.json(instituts);
        })
        .catch(err => {
            //result = getErrorResponseTemplate("database error");
            //res.json(result);
        });
};

exports.addInstitut = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { name } = request.body;
    model.Institut.create({ name: name })
        .then(result => {
            response.json({ status: "OK" });
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};

exports.removeInstitut = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id } = request.body;
    model.Institut.destroy({
        where: {
            id: id
        }
    })
        .then(result => {
            response.json({ status: "OK" });
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};

exports.updateInstitut = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id, name } = request.body;
    model.Institut.update({name: name},{
        where: {
            id: id
        }
    })
        .then(result => {
            response.json({ status: "OK" });
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};