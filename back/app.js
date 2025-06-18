const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path')

const authenticated = require('./middlewares/authenticated');

const port = 3001;
const app = express();




app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.resolve('..', 'front', 'dist')))

app.use('/api', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));

app.use('/api/cart', authenticated, require('./routes/cart'));

app.get("/*path", (req, res) => {
    res.sendFile(path.resolve("..", "front", "dist", "index.html"))
});

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('DB connection error:', err);
    });
