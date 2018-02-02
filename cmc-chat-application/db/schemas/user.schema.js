import sha256 from 'sha256';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true }
});

userSchema.methods.comparePassword = (password) => {
    console.log(sha256(password));
    // console.log(hashedPassword);
    // return this.hashedPassword === sha256(password);
}

export default userSchema;