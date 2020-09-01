/* MOCK SERVER */
const express = require('express');
const apiMocker = require('connect-api-mocker');
const cors = require('cors');
const { json } = require('express');

const PORT = 9000;
const app = express();
app.use(cors());
app.use(json());

app.use('/api', apiMocker('mock-api'));

app.listen(PORT, () => {
    console.log(`Mock API Server is up and running at: http://localhost:${PORT}`)
})