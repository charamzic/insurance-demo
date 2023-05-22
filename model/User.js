import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    }
}, { timestamps: true });

userSchema.statics.login = async function (name) {
    const user = await this.findOne({ name });
    if (user) {
        console.info('Doing the verification logic...');
        console.info('Logging in the user...');
        return user;
    }
    throw Error('incorrect name');
};

export const User = mongoose.model('User', userSchema);