const express = require('express');

const app = express();

const port = process.env.PORT || 3002;

app.use('socmed/profile', profile)

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});