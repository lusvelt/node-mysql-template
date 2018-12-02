const _ = require('lodash');

const { registrationErrorStatusCode, mysqlDuplicateError } = require('./../config/params');
const User = require('../models/User');

const register = async (req, res) => {
    const user = req.body;
    try {
        const dbInstance = await User.create(user);
        const responseDbInstance = _.omit(dbInstance.dataValues, ['password', 'createdAt', 'updatedAt']);
        res.send(responseDbInstance);
    } catch (err) {
        if (err.original && err.original.errno === mysqlDuplicateError)
            res.status(registrationErrorStatusCode).send(_.pick(err.original, ['code']));
        else
            res.status(registrationErrorStatusCode).send();
    }
};

module.exports = register;