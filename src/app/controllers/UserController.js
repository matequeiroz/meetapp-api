import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import * as errors from '../../constants/errors';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      nickname: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
      phone: Yup.string().min(11),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({
        error: {
          code: errors.VALIDATION_FAILED,
          payload: req.body,
        },
      });
    }

    if (await User.findOne({ where: { email: req.body.email } })) {
      return res.status(400).json({
        error: {
          code: errors.EMAIL_ALREADY_REGISTERED,
          payload: req.body,
        },
      });
    }

    const { email, id } = await User.create(req.body);
    return res.status(201).json({
      user: {
        id,
        email,
      },
      token: jwt.sign({ id }, process.env.APP_SECRET, {
        expiresIn: '7d',
      }),
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      nickname: Yup.string(),
      email: Yup.string()
        .email()
        .required(),
      phone: Yup.string().min(11),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({
        error: {
          code: errors.VALIDATION_FAILED,
          payload: req.body,
        },
      });
    }
    try {
      const user = await User.findByPk(req.userId);
      await user.update(req.body);
      return res.status(204).json({});
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: {
          code: errors.INTERNAL_SERVER_ERROR,
        },
      });
    }
  }
}

export default new UserController();
