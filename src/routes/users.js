import express from 'express';
import auth from '../app/middlewares/auth';
import UserController from '../app/controllers/UserController';

const router = express.Router();

/* GET users listing. */
router.post('/', UserController.store);
router.put('/', auth, UserController.update);

export default router;
