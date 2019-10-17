const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const model = require("./model");
const routes = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, response, next) {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,POST");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.use("/institut", routes.institutRouter);
app.use("/teacher", routes.teacherRouter);
app.use("/specialty", routes.specialtyRouter);
app.use("/group", routes.groupRouter);
app.use("/student", routes.studentRouter);

model.sequelize
    .sync()
    .then(() => {
        app.listen(3000, function() {
            console.log("Сервер ожидает подключения...");
        });
    })
    .catch(err => console.log(err));

// app.get("/faculty", function(req, res) {
//     let result;
//     setHeaders(res);
//     model.Faculty.findAll({ raw: true })
//         .then(faculties => {
//             result = getSuccesResponseTemplate(faculties);
//             res.json(result);
//         })
//         .catch(err => {
//             result = getErrorResponseTemplate("database error");
//             res.json(result);
//         });
// });

// function getSuccesResponseTemplate(data) {
//     return {
//         status: "succes",
//         data: data
//     };
// }

// function getErrorResponseTemplate(error) {
//     return {
//         status: "error",
//         error: error
//     };
// }
