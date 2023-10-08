const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true, //remove if incorrect
        default: "",
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 35,
    },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    photo: {}, //leave {} blank if not sure what would it be
    role: {
        type: [String],
        default: ['Renter'],
        enum: ["Owner", "Renter", "Admin"]
    },
    enquiredProperties: [{ type: Schema.Types.ObjectId, ref: 'Ad' }],
    wishlish: [{ type: Schema.Types.ObjectId, ref: 'Ad' }],
    resetCode: "",

}, { timestamps: true })

export default model('User', schema)