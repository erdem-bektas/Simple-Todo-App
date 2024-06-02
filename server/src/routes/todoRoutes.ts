import { Request, Response, Router } from 'express';
import TodoController from '../controllers/TodoController';
import authMiddleware from '../middlewares/authMiddleware';
import upload from '../middlewares/uploadMiddleware';
const router = Router();

router.post('/add', authMiddleware, upload, TodoController.addTodo);
router.post('/edit/:id', authMiddleware, upload, TodoController.editTodo);
router.post('/delete/:id', authMiddleware, TodoController.deleteTodo);

router.get('/list', authMiddleware, TodoController.listTodos);
router.get('/get/:id', authMiddleware, TodoController.getTodo);
router.get('/filter-tag/:tag', authMiddleware, TodoController.filterTag);

export default router;
