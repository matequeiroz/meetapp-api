import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import * as errors from '../../constants/errors';

/**
 * @class
 * @author Mateus Queiroz
 * Class responsible for user login and logout via JWT
 */
class SessionController {
  // This method returns the logged in user's JWT token.
  async login(req, res) {
    // validation input
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(400).json({
        error: {
          code: errors.VALIDATION_FAILED,
          payload: req.body,
        },
      });
    }

    // get user with this e-mail
    const user = await User.findOne({ where: { email: req.body.email } });

    // Let's check if the user exists?
    if (!user) {
      return res.status(401).json({
        error: {
          code: errors.USER_NOT_FOUND,
          payload: req.body,
        },
      });
    }

    // verify passoword of user
    if (!(await user.checkPassword(req.body.password))) {
      return res.status(401).json({
        error: {
          code: errors.PASSWORD_DOES_NOT_MATCH,
          payload: req.body,
        },
      });
    }

    return res.status(200).json({
      payload: {
        user: {
          name: user.name,
          email: user.email,
        },
        token: jwt.sign({ id: user.id }, process.env.APP_SECRET, {
          expiresIn: '7d',
        }),
      },
    });
  }
}

export default new SessionController();
