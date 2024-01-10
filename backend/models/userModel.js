import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [4, 'Name should be greater than 4 characters'],
        maxLength: [30, 'Name should be less than 30 characters']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        minLength: [8, 'Password should be greater than 8 characters']
    },
    googleId: {
        type: String,
        required: false
    }
});

userSchema.pre('save', async function (next) {
    // Hash the password only if it's present
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
    if (!this.password) {
        return false; // Return false if password is not set
    }
    return await bcrypt.compare(enteredPassword, this.password);
};

export const userModel = mongoose.model('users', userSchema);
