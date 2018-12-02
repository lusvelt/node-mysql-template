const express = require('express');
const fs = require('fs');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('./server/config/config');
const database = require('./server/config/database');
const router = require('./server/config/router');
const passportJwtStrategy = require('./server/auth/strategies/passportJwt');

const rootPath = __dirname;
const distPath = path.join(rootPath, 'dist');
const port = process.env.PORT;

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(distPath));

passport.use(passportJwtStrategy);

database.initialize();
router.initialize(app, passport);

server.listen(port, () => console.log(`Application running on port ${port}`));