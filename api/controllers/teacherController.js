const model = require('../model');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'qwerty';

exports.getTeachers = function(request, response) {
    model.Teacher.findAll({ raw: true })
        .then(teachers => {
            response.json(teachers);
        })
        .catch(err => {
            //result = getErrorResponseTemplate("database error");
            //res.json(result);
        });
};

exports.loginTeacher = function(request, response) {
    if (!request.body) return response.sendStatus(400);
    const { login, password } = request.body;
    model.Teacher.findOne({ where: { login: login }, raw: true })
        .then(user => {
            if (!user) {
                response.status(401).json({ message: 'User does not exist!' });
            }
            //const isValid = password == user.password ? true : false;
            const isValid = bCrypt.compareSync(password, user.password);
            if (isValid) {
                let token = jwt.sign(user.id.toString(), jwtSecret);
                let name =
                    user.lastName +
                    ' ' +
                    user.firstName.charAt(0) +
                    '.' +
                    user.middleName.charAt(0) + '.';
                response.json({ token: token, name: name, id: user.id });
            } else {
                response.status(401).json({ message: 'Invalid credentials!' });
            }
        })
        .catch(err => response.status(500).json({ message: err.message }));
};


exports.checkPermission = function(request, response) {
    const { subjectId, teacherId } = request.body;
    model.Teacher.findByPk(teacherId)
        .then(teacher => {
            teacher.getSubjects().then(subjects => {
                result = subjects.findIndex(subject => subject.id == subjectId);
                if( result !== -1){
                    response.json({permission : true})
                } else{
                    response.json({permission : false})
                }
            })
           
        })
        .catch(err => {
            //result = getErrorResponseTemplate("database error");
            //res.json(result);
        });
};