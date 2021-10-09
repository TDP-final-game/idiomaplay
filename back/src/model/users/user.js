const mongoose = require('mongoose');

const User = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'first name is required']
    },
    last_name: {
        type: String,
        required: [true, 'last name is required']
    },
});

module.exports = User;
