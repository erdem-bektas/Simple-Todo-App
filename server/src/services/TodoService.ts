import { ITodo, Todo } from '../models/Todo';

class TodoService {
    public async addTodo(userId: string, title: string, description: string, tags: string[], files: { path: string, isImage: boolean, originalname: string }[] | null): Promise<ITodo> {
        const todo = new Todo({ userId, title, description, tags, files });
        return await todo.save();
    }

    public async editTodo(todoId: string, userId: string, updateData: Partial<ITodo>): Promise<ITodo | null> {
        return await Todo.findOneAndUpdate({ _id: todoId, userId }, updateData);
    }

    public async deleteTodo(todoId: string, userId: string): Promise<{ deleted: boolean }> {
        const result = await Todo.deleteOne({ _id: todoId, userId });
        return { deleted: result.deletedCount === 1 };
    }

    public async listTodos(userId: string, page: number = 1, limit: number = 10): Promise<{ todos: ITodo[], totalItems: number, totalPages: number, page: number, limit: number }> {
        const totalItems = await Todo.countDocuments({ userId });
        const totalPages = Math.ceil(totalItems / limit);
        const offset = (page - 1) * limit;
        const todos = await Todo.find({ userId }).skip(offset).limit(limit);

        return { todos, totalItems, totalPages, page, limit };
    }

    public async getTodo(todoId: string): Promise<ITodo | null> {
        return await Todo.findById(todoId);
    }

    public async filterTag(userId: string, tag: string): Promise<ITodo[]> {
        return await Todo.find({ userId, tags: { $in: [tag] } });
    }

}

export default new TodoService();
