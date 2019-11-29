const model = require("../model");

exports.getMarkBySubjectIdAndStudentId = function (request, response) {
    let studentId = request.query.studentId;
    let subjectId = request.query.subjectId;
    model.Mark.findAll({
            raw: true
        })
        .then(subjects => {
            response.json(subjects);
        })
        .catch(err => res.json({
            status: "Error"
        }));
};

exports.addMark = function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const {
        mark,
        pass,
        studentId,
        subjectId
    } = request.body;
    model.Mark.create({
            mark,
            countOfPass: pass,
            StudentId: studentId,
            SubjectId: subjectId
        })
        .then(result => {
            response.json({
                status: "OK"
            });
        })
        .catch(err => {
            res.json({
                status: "Error"
            });
        });
};

exports.updateMark = function (request, response) {
    if (!request.body) return response.sendStatus(400);
    const {id, mark, pass} = request.body;
    model.Mark.update({mark, pass}, {
            where: {id}
        })
        .then(result => {
            response.json({
                status: "OK"
            });
        })
        .catch(err => {
            res.json({
                status: "Error"
            });
        });
};