const mongoose = require('mongoose');

const ExamInfo = new mongoose.Schema({
    _id: false,
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'difficulty is required']
    },
    durationInMinutes: {
        type: Number,
        required: [true, 'durationInMinutes is required']
    }
});

module.exports = ExamInfo;
