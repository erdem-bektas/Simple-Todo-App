import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';
import ErrorHandler from './middlewares/ErrorHandler';
import Database from './lib/database';
dotenv.config();

class Server {
  private app: Application;
  private port: number | string;
  private database: Database;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.database = Database.getInstance(process.env.MONGO_URI || 'your-default-mongodb-connection-string');
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

  private initializeRoutes(): void {
    this.app.use('/users', userRoutes);
    this.app.use('/todos', todoRoutes);
    this.app.get('/', (req, res) => {
      res.send('server running');
    });
    this.app.use((req, res, next) => ErrorHandler.handleNotFound(req, res, next));
  }

  private initializeErrorHandling(): void {
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => ErrorHandler.handleErrors(err, req, res, next));
  }

  public async start(): Promise<void> {
    try {
      await this.database.connect();
      this.app.listen(this.port, () => {
        console.log(`Server is running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1);
    }
  }
}

export default Server;

