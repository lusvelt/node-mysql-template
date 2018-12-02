const { User } = require('./models');

const seed = async () => {
    const users = [
        await User.create({
            name: 'Name',
            surname: 'Surname',
            birthDate: new Date(1900, 0, 1),
            email: 'nname.surname@example.com',
            password: 'password',
            isAdmin: true
        })
    ];
};

module.exports = seed;