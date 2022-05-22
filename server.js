const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const app = express();

//Middleware
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('Connected to server!'))
    .catch(err => console.log(err));

//Routes
app.use('/api/items', items);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));