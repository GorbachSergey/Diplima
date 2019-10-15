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
