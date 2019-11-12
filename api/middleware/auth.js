const jwt = require('jsonwebtoken');
const jwtSecret = 'qwerty';

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ message: 'Token not provided!' });
    }
    let re = /Bearer /;
    const token = authHeader.replace(re, '');
    try {
        jwt.verify(token, jwtSecret);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token!' });
        }
    }
    next();
};
