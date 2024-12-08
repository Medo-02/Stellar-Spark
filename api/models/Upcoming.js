const mongoose = require('mongoose');
const { Schema } = mongoose;

const upcomingSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    event: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
    name: {type: String, required:true},
    phone: {type: Number, required:true}
})

const UpcomingModel = mongoose.model('Upcoming', upcomingSchema);
module.exports = UpcomingModel;