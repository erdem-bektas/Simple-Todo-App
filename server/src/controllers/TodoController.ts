import { Request, Response, NextFunction } from 'express';
import TodoService from '../services/TodoService';

class TodoController {
    public addTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const files = (req.files as Express.Multer.File[])?.map(file => ({
            originalname: file.originalname,
            path: file.path,
            isImage: file.mimetype.startsWith('image/')
        }));

        const { title, description, tags } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(403).json({ error: 'User ID is missing from request.' });
        }

        try {
            const todo = await TodoService.addTodo(userId, title, description, tags, files);
            res.status(201).json(todo);
        } catch (error) {
            next(error);
        }
    };

    public editTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const { title, description, tags } = req.body;
        const userId = req.user!.id;
        const updateData = { title, description, tags }

        try {
            const todo = await TodoService.editTodo(id, userId, updateData);
            res.status(200).send(todo);
        } catch (error) {
            next(error);
        }
    };

    public deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const { id } = req.params;
        const userId = req.user?.id;

        try {
            const result = await TodoService.deleteTodo(id, userId);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    public listTodos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const userId = req.user!.id;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        try {
            const { todos, totalItems, totalPages } = await TodoService.listTodos(userId, page, limit);
            res.status(200).json({ todos, page, limit, totalItems, totalPages });
        } catch (error) {
            next(error);
        }
    };


    public getTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = req.params.id;

        try {
            const todo = await TodoService.getTodo(id);
            res.status(200).json(todo);
        } catch (error) {
            next(error)
        }
    };

    public filterTag = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const tag = req.params.tag;
        const userId = req.user!.id;

        try {
            const todo = await TodoService.filterTag(userId, tag);
            res.status(200).json(todo);
        } catch (error) {
            next(error)
        }
    };

}

export default new TodoController();
