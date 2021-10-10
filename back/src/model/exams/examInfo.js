module.exports = {
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
}
