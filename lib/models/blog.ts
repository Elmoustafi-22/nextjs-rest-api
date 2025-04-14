import { Model, Schema, model, models } from "mongoose";
import { Types } from "mongoose";

export interface IBlog {
    title: string;
    description: string;
    user: Types.ObjectId;
    category: Types.ObjectId,
}

const BlogSchema: Schema<IBlog> = new Schema<IBlog>({
    title: { type: String, required:true },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }
}, {
    timestamps: true
});

const Blog: Model<IBlog> = models.User || model("Blog", BlogSchema);

export default Blog;