const mongoose = require('mongoose');

const UnitInfo = new mongoose.Schema({
    _id: false,
    orderNumber: {
        type: Number,
        required: [true, 'orderNumber is required']
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
});


module.exports = UnitInfo;
