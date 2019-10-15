const model = require("../model");

exports.getSpecialtiesByFacultyId = function(request, response) {
    let id = request.query.id;
    model.Institut.findByPk(id)
        .then(institut => {
            if (!institut) response.json({ error: "Institut not found!" });
            institut
                .getSpecialties({ raw: true })
                .then(res => {
                    response.json(res);
                })
                .catch(err => console.log(err));
        })
        .catch(err => {
            //result = getErrorResponseTemplate("database error");
            //res.json(result);
        });
};

