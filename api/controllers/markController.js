const model = require("../model");

exports.getMarkBySubjectIdAndStudentId = function(request, response) {
    let studentId = request.query.studentId;
    let subjectId = request.query.subjectId;
    model.Mark.findAll({ raw: true })
        .then(subjects => {
            response.json(subjects);
        })
        .catch(err => res.json({ status: "Error" }));
};