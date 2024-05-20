const jwt = require('jsonwebtoken');
const errorHandler = require('../utils/error');


const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token =   authHeader?.split(' ')[1];
    // res.json(token);
   
    if (token == null) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        next();
    });
}

module.exports = verifyToken