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

exports.addSpecialty = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { code, name, id } = request.body;
    model.Institut.findByPk(id)
        .then(institut => {
            if (!institut) response.json({ error: "Institut not found!" });
            institut
                .createSpecialty({ name: name, code: code })
                .then(res => {
                    response.json({ status: "OK" });
                })
                .catch(err => res.json({ status: "Error" }));
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};

exports.removeSpecialty = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id } = request.body;
    model.Specialty.destroy({
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

exports.updateSpecialty = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id, name, code } = request.body;
    model.Specialty.update(
        { name: name, code: code },
        {
            where: {
                id: id
            }
        }
    )
        .then(result => {
            response.json({ status: "OK" });
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};
