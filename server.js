const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const items = require('./routes/api/items');
const comments = require('./routes/api/comments');
const path = require('path');

const app = express();
var cors = require('cors');
app.use(cors());
//Middleware
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;
const { builtinModules } = require('module');

mongoose.connect(db)
    .then(() => console.log('Connected to server!'))
    .catch(err => console.log(err));

//Routes
app.use('/api/items', items);
app.use('/api/comments', comments);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
