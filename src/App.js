import express from 'express';
import path from 'path';
import logger from 'morgan';
import usersRouter from './routes/users';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.set('port', process.env.PORT || '3000');
  }

  routes() {
    this.app.use('/user', usersRouter);
  }
}

export default new App().app;
