const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const profile = require('./routes/profile')
const user = require('./routes/user')
// const mongoDB = process.env.MONGODB_URI;
const mongoDB = "mongodb+srv://root:rootroot@codeb-1za4v.mongodb.net/codebook?retryWrites=true&w=majority"

const app = express();
const port = process.env.PORT || 3002;

app.use(cors())
app.options('*', cors());

mongoose.connect(mongoDB, { useNewUrlParser: true })

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json({extended:false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('socmed/profile', profile)
app.use('/users', user)

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});