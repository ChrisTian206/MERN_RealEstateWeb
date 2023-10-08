const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        //trim: true,
        required: true,
        //unique: [true, 'This username has been used'],
        lowercase: true
    },
    name: {
        type: String,
        //trim: true, //remove if incorrect
        default: "",
    },
    email: {
        type: String,
        //trim: true,
        required: true,
        //unique: [true, 'This emaill address has been used'],
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        maxLength: 300, //hashedpassowrd is stored, it's gonna be long
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
    resetCode: {},

}, { timestamps: true })

//Create a Mongoose model based on the schema
const User = mongoose.model("User", userSchema)

module.exports = User;