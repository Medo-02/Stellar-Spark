const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    description: String,
    location: String,
    date: Date,
    type: String,
    photos: [String],
    features: [String],
    extraInfo: String,
    maxParticipants: Number,
});

const EventModel = mongoose.model('Event', EventSchema);

module.exports = EventModel;
