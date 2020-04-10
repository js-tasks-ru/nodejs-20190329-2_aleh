const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        // match: /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/,
        validate: [{
            validator: function (email) {
                const regexp = /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/;
                return regexp.test(email);
            },
            msg: 'Email should match pattern!',
        }],
        lowercase: true,
        trim: true,
    },
    displayName: {
        type: String,
        required: true,
        index: true,
        trim: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', schema);
