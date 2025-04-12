import { models, model, Schema, Model, Types } from "mongoose";

export interface ICategory {
    title: string;
    user: Types.ObjectId;
}

const CategorySchema: Schema<ICategory> = new Schema<ICategory>({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, {
    timestamps: true
})

const Category: Model<ICategory> = models.Category || model<ICategory>("Category", CategorySchema);

export default Category;