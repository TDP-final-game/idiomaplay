module.exports = {
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
}
