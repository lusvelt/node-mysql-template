const sequelize = require('../config/sequelize');

const utils = {
    getForeignKey: (model) => model.name.toLowerCase() + 'Id'
};

module.exports = utils;