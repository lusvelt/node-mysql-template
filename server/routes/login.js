const User = require('../models/User');
const { authErrorStatusCode, authErrorString } = require('../config/params');

const login = async (req, res) => {
    const email = req.body.email;
    const clearTextPassword = req.body.password;

    try {
        const token = await User.generateAuthToken(email, clearTextPassword);
        res.send({ token });
    } catch (err) {
        res.status(authErrorStatusCode).send(authErrorString);
    }
};

module.exports = login;