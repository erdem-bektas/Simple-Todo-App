import { Schema, model, Document, ObjectId } from 'mongoose';

interface ITodo extends Document {
    userId: ObjectId;
    title: string;
    description: string;
    tags: string[];
    files: { path: string, isImage: boolean, originalname: string }[];
}

const TodoSchema: Schema = new Schema({
    userId: { type: Schema.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: false },
    files: [{
        path: { type: String, required: true },
        isImage: { type: Boolean, required: true },
        originalname: { type: String, required: true }
    }],
});

const Todo = model<ITodo>('Todo', TodoSchema);

export type { ITodo };
export { Todo };
