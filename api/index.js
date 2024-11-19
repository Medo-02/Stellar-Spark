const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const bcrypt = require('bcryptjs');


const bcryptSalt = bcrypt.genSaltSync(10);
const UserModel = require('./models/User.js');
mongoose.connect(process.env.MONGO_URL);

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userDoc = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
});

app.listen(4000);