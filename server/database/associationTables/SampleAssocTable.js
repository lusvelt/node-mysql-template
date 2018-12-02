const Sequelize = require('sequelize');

const sequelize = require('../../config/sequelize');

const SampleAssocTable = sequelize.define('SampleAssocTable', {
    // Attributes
});

module.exports = SampleAssocTable;