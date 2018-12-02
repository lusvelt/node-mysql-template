const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const sequelize = require('../config/sequelize');
const { saltRounds } = require('../config/params');

const User = sequelize.define('User', {
    name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
    birthDate: { type: Sequelize.DATE, allowNull: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    isAdmin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0 }
});

User.beforeCreate((user, options) => {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    user.password = hashedPassword;
});

User.generateAuthToken = async (email, clearTextPassword) => {
    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(clearTextPassword, user.password))
        throw new Error();

    const jwtPayload = _.pick(user, ['id', 'name', 'surname', 'email', '']);
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET).toString();

    return token;
};

User.getUsersList = () => User.findAll({ attributes: ['name', 'surame', 'birthDate', 'email', 'isAdmin'] });

module.exports = User;