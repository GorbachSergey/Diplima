const model = require("../model");

exports.getGroups = function(request, response) {
    model.Group.findAll({ raw: true })
        .then(groups => {
            response.json(groups);
        })
        .catch(err => {
            //result = getErrorResponseTemplate("database error");
            //res.json(result);
        });
};

exports.getGroupsByCourse = function(request, response) {
    let course = request.query.course;
    model.Group.findAll({where:{course : course}, raw: true })
        .then(groups => {
            response.json(groups);
        })
        .catch(err => {
            //result = getErrorResponseTemplate("database error");
            //res.json(result);
        });
};

exports.getGroupsBySpecialtyIdAndCourse = function(request, response) {
    let id = request.query.id;
    let course = request.query.course;
    model.Specialty.findByPk(id)
        .then(spec => {
            if (!spec) response.json({ error: "Specialty not found!" });
            spec
                .getGroups({where:{course : course}, raw: true })
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

exports.addGroup = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { specId, name, course} = request.body;
    model.Specialty.findByPk(specId)
        .then(spec => {
            if (!spec) response.json({ error: "Specialty not found!" });
            spec
                .createGroup({ name: name, course: course })
                .then(res => {
                    response.json({ status: "OK" });
                })
                .catch(err => res.json({ status: "Error" }));
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};

exports.removeGroup = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id } = request.body;
    model.Group.destroy({
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

exports.updateGroup = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id, name, course } = request.body;
    model.Group.update(
        { name: name, course: course },
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