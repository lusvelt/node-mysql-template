const utils = require('./utils');

const {
    User
} = require('./models');

const {
    
} = require('./associationTables');

const userFk = utils.getForeignKey(User);

// EXAMPLE User - Session | 1:N
// User.hasMany(Session, { foreignKey: userFk });
