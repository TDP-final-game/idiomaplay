const mongoose = require('mongoose');

const LessonInfo = new mongoose.Schema({
    _id: false,
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    orderNumber: {
        type: Number,
        required: [true, 'orderNumber is required']
    }
});

module.exports = LessonInfo;
