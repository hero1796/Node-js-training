import userSchema from "../schemas/user.schema";
import mongoose from 'mongoose';

const User = mongoose.model('User', userSchema);
export default User;