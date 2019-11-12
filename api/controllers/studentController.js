const model = require('../model');

exports.getStudents = function(request, response) {
    model.Sudent.findAll({ raw: true })
        .then(students => {
            response.json(students);
        })
        .catch(err => res.json({ status: 'Error' }));
};

exports.getStudentsByGroup = function(request, response) {
    let groupId = request.query.groupId;
    result = [];
    model.Student.findAll({
        where: { groupId: groupId },
        include: [
            {
                model: model.Mark
            }
        ]
    }).then(students => {
        const resObj = students.map(student => {
            return Object.assign(
                {},
                {
                    student_id: student.id,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    middleName: student.middleName,
                    marks: student.Marks.map(mark => {
                        console.log(mark);
                        return Object.assign(
                            {},
                            {
                                mark_id: mark.id,
                                mark: mark.mark,
                                pass: mark.countOfPass,
                                subject_id: mark.SubjectId
                            }
                        );
                    })
                }
            );
        });
        response.json(resObj);  
    });
    // model.Group.findByPk(groupId)
    //     .then(group => {
    //         if (!group) response.json({ error: 'Group not found!' });
    //         group
    //             .getStudents()
    //             .then(res => {
    //                 for (let i = 0; i < res.length; i++) {
    //                     res[i]
    //                         .getMarks({
    //                             where: { SubjectId: subjectId },
    //                             raw: true
    //                         })
    //                         .then(res1 => {
    //                             console.log(res1);
    //                             result.push(res1);
    //                             console.log(result);
    //                         });

    //                 }
    //                 return result;
    //             }).then(q =>{
    //                 response.json(q);
    //             })
    //             .catch(err => console.log(err));
    //     })
    //     .catch(err => response.json({ status: 'Error' }));
};

exports.addStudent = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { groupId, firstName, middleName, lastName } = request.body;
    model.Group.findByPk(groupId)
        .then(group => {
            if (!group) response.json({ error: 'Group not found!' });
            group
                .createStudent({
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName
                })
                .then(res => {
                    response.json({ status: 'OK' });
                })
                .catch(err => res.json({ status: 'Error' }));
        })
        .catch(err => {
            res.json({ status: 'Error' });
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
            response.json({ status: 'OK' });
        })
        .catch(err => {
            res.json({ status: 'Error' });
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
            response.json({ status: 'OK' });
        })
        .catch(err => {
            res.json({ status: 'Error' });
        });
};
