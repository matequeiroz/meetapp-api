import * as Yup from 'yup';
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
    });
  }
}

export default new UserController();
