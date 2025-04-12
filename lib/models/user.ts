import { Schema, models, model, Model } from "mongoose";

export interface IUser {
    email: string;
    username: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true
})

const User: Model<IUser> = models.User || model<IUser>("User", UserSchema);

export default User;