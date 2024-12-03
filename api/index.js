const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'jwt_secret';
const UserModel = require('./models/User.js');
const EventModel = require('./models/Event.js');
mongoose.connect(process.env.MONGO_URL);

app.use('/uploads', express.static(__dirname+'/uploads'));
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

app.post('/upload-by-link', async (req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname+'/uploads/'+newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({dest: 'uploads/'})
app.post('/upload-by-files', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path: filePath, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = filePath + '.' + ext;
        fs.renameSync(filePath, newPath);
        uploadedFiles.push(path.basename(newPath));
    }
    res.json(uploadedFiles)
});

app.get('/user-events', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        res.json(await EventModel.find({owner: userData.id}));
    });
});

app.get('/events', async(req, res) => {
    res.json(await EventModel.find())
})

app.post('/events', (req, res) => {
    const { token } = req.cookies;
    const { 
        title, description, location,
        date, time, type, photos,
        features, extraInfo, maxParticipants
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const eventDoc = await EventModel.create({
            owner: userData.id,
            title, description, location,
            date, time, type, photos,
            features, extraInfo, maxParticipants
        })
        res.json(eventDoc);
    })
});

app.put('/events/', (req, res) => {
    const { token } = req.cookies;
    const { 
        id, title, description, location,
        date, time, type, photos,
        features, extraInfo, maxParticipants
    } = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const eventDoc = await EventModel.findById(id);
        if (userData.id === eventDoc.owner.toString()) {
            eventDoc.set({
                title, description, location,
                date, time, type, photos,
                features, extraInfo, maxParticipants
            })
            await eventDoc.save()
            res.json('ok');
        }
    })
});

app.get('/events/:id', async(req, res) => {
    const { id } = req.params;
    res.json(await EventModel.findById(id));
});


app.listen(4000);