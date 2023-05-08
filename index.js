require('dotenv').config();
const home = require('./routes/home');
const insureds = require('./routes/insureds');
const port = process.env.PORT || 3000;
const express = require('express');
const app = express();
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', home);
app.use('/api/insureds', insureds);