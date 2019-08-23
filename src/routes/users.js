import express from 'express';
import UserController from '../app/controllers/UserController';

const router = express.Router();

/* GET users listing. */
router.post('/', UserController.store);

export default router;
