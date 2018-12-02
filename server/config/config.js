const dotenv = require('dotenv');
const path = require('path');

const env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test')
    dotenv.config({ path: path.join(__dirname, '../../development.env') });
else
    dotenv.config({ path: path.join(__dirname, '../../.env') });