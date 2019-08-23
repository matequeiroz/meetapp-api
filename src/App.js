import express from 'express';
import Sequelize from 'sequelize';
import path from 'path';
import logger from 'morgan';
import dotenv from 'dotenv';
import User from './app/models/User';
import credential from './database/config';
import usersRouter from './routes/users';
import sessionsRouter from './routes/sessions';

/**
 * @author Mateus Queiroz
 * This class configures all express,
 * such as routes, middleware,
 * and database connection.
 */
class App {
  constructor() {
    // loader dotenv
    dotenv.config();
    this.app = express();
    // loader models
    this.models = [User];
    this.middlewares();
    this.routes();
    this.database();
  }

  // application middlewares setup
  middlewares() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.set('port', process.env.PORT || '3000');
  }

  // application route setup
  routes() {
    this.app.use('/user', usersRouter);
    this.app.use('/login', sessionsRouter);
  }

  // configuration database
  database() {
    try {
      this.connection = new Sequelize(credential);
      /**
       * Here we pass the sequelize instance
       * to the init method of all our models.
       */
      this.models.map(model => {
        model.init(this.connection);
      });
    } catch (error) {
      console.error(error);
      throw new Error('Error in connection with database');
    }
  }
}

export default new App().app;
