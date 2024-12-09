const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: { type: String, required: true },
    upcomingEvents: [{ type: mongoose.Schema.Types.ObjectId }],
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
