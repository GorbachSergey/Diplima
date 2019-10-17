const model = require("../model");

exports.getSubjects = function(request, response) {
    model.Subject.findAll({ raw: true })
        .then(subjects => {
            response.json(subjects);
        })
        .catch(err => res.json({ status: "Error" }));
};

exports.getSubjectsByGroup = function(request, response) {
    let groupId = request.query.groupId;
    model.Group.findByPk(groupId)
        .then(groups => {
            if (!groups) response.json({ error: "Group not found!" });
            groups
                .getSubjects({ raw: true })
                .then(res => {
                    response.json(res);
                })
                .catch(err => console.log(err));
        })
        .catch(err => res.json({ status: "Error" }));
};

exports.addSubject = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { groupId, name } = request.body;
    model.Group.findByPk(groupId)
        .then(group => {
            if (!group) response.json({ error: "Group not found!" });
            group
                .createSubject({
                    name: name
                })
                .then(res => {
                    response.json({ status: "OK" });
                })
                .catch(err => res.json({ status: "Error" }));
        })
        .catch(err => {
            res.json({ status: "Error" });
        });
};

exports.removeSubject = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id } = request.body;
    model.Subject.destroy({
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

exports.updateSubject = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id, name } = request.body;
    model.Subject.update(
        { name: name },
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
