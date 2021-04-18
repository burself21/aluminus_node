const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        validate: {
            validator: v => {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => "Please enter a valid email address."
        },

        required: [true, 'Email required']
    },

    password: {
        type: String,
        validate: {
            validator: v => {
                return v.length >= 8 && v.length <= 100;
            },
            message: props => "Must be between 8 and 100 characters."
        },

        required: [true, 'Password required']
    }
});

module.exports = mongoose.model('Users', UserSchema);