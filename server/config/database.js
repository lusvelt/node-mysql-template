const sequelize = require('./sequelize');
const seed = require('../database/seed');

const database = {
    initialize: async () => {
        try {
            await sequelize.authenticate();
            console.log('Connection to database has been established successfully.');
            require('../database/models');
            require('./../database/associations');
            await sequelize.sync({ force: process.env.NODE_ENV !== 'production' });
            if (process.env.NODE_ENV !== 'production') await seed();
            console.log('Database initialized successfully');
        } catch (err) {
            console.error(err);
        }
    }
};

module.exports = database;