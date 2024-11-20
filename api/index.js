const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jwt_secret';
const UserModel = require('./models/User.js');
mongoose.connect(process.env.MONGO_URL);

app.use(cookieParser());
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const userDoc = await UserModel.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({email: userDoc.email, id: userDoc._id}, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            }
            else {
                res.status(422).json('password wrong'); 
            }
        } else {
            res.status(422).json('user not found');
        }
    } catch (e) {
        res.status(422).json(e);
    }
});

app.get('/profile', (req, res) => {
    const {token} = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const {name, email, _id} = await UserModel.findById(userData.id);
            res.json({name, email, _id});
        });
    } else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json({message: 'logged out'});
});
app.listen(4000);