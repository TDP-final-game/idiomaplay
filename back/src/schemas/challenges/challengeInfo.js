const mongoose = require('mongoose');

const ChallengeInfo = new mongoose.Schema({
    _id: false,
    name: {
        type: String,
        required: [true, 'name is required']
    },
    difficulty: {
        type: String,
        required: [true, 'difficulty is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
});


module.exports = ChallengeInfo;
