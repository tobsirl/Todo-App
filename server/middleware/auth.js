import jwt from 'jsonwebtoken';
import 'dotenv/config';

export default function(req, res, next) {
  // Get the token from header
  const token = req.header('x-auth-token');

  // check for no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const { JWTSECRET } = process.env;
  // verify the token
  try {
    const decoded = jwt.verify(token, JWTSECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}
