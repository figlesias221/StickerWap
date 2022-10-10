export { };

let mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: { type: String, required: true },
    region: { type: String, required: true },
    matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
});

module.exports = mongoose.model('User', userSchema);