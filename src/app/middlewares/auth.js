import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import * as errors from '../../constants/errors';
/**
 * @author Mateus Queiroz
 * middleware responsible for validating the entered token.
 */

export default async (req, res, next) => {
  /**
   * Checks whether the authorization
   * header has been entered
   */

  if (!req.headers.authorization)
    return res.status(400).json({
      error: {
        code: errors.TOKEN_NOT_PROVIDER,
      },
    });
  // Data Transformation for get token
  const token = req.headers.authorization.split(' ')[1];
  try {
    /**
     * Here we decode the token and put
     * the user ID inside the token into
     * the request object.
     */
    const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    // The token entered is invalid and has not been decoded
    return res.status(401).json({
      error: {
        code: errors.TOKEN_IS_INVALID,
        payload: token,
      },
    });
  }
};
