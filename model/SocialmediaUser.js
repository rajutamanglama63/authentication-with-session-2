const mongoose = require("mongoose");

const socialMediaSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    conformpassword : {
        type: String,
        required: true
    }
});

const socialMediaUser = mongoose.model('socialMediaUser', socialMediaSchema);

module.exports = socialMediaUser;