const model = require("../model");

exports.getStudents = function(request, response) {
    model.Sudent.findAll({ raw: true })
        .then(students => {
            response.json(students);
        })
        .catch(err => res.json({ status: "Error" }));
};

exports.getStudentsByGroup = function(request, response) {
    let groupId = request.query.groupId;
    model.Group.findByPk(groupId)
        .then(groups => {
            if (!groups) response.json({ error: "Group not found!" });
            groups
                .getStudents({ raw: true })
                .then(res => {
                    response.json(res);
                })
                .catch(err => console.log(err));
        })
        .catch(err => res.json({ status: "Error" }));
};

exports.addStudent = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { groupId, firstName, middleName, lastName } = request.body;
    model.Group.findByPk(groupId)
        .then(group => {
            if (!group) response.json({ error: "Group not found!" });
            group
                .createStudent({
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName
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

exports.removeStudent = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id } = request.body;
    model.Student.destroy({
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

exports.updateStudent = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { id, firstName, middleName, lastName } = request.body;
    model.Student.update(
        { firstName: firstName, middleName: middleName, lastName: lastName },
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
