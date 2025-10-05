const express = require('express');
const cors = require('cors');

const productRouter = require('./routes/ProductRoute');

const app = express();
app.use(cors());
app.use(express.json());

// const PORT = process.env.PORT || 3000;

app.use('/products',productRouter);
module.exports = app; 