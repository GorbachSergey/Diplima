const model = require("../model");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = "qwerty";

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
                response.status(401).json({ message: "User does not exist!" });
            }
            //const isValid = password == user.password ? true : false;
            const isValid = bCrypt.compareSync(password, user.password);
            if (isValid) {
                let token = jwt.sign(user.id.toString(), jwtSecret);
                if(user.login == 'admin'){
                    token = 'PT_' + token; 
                }else{
                    token = 'GT_' + token; 
                }
                response.json({token: token});
            } else {
                response.status(401).json({ message: "Invalid credentials!" });
            }
        })
        .catch(err => response.status(500).json({ message: err.message }));
};
