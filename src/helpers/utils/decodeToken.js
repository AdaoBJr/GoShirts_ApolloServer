import { verify } from 'jsonwebtoken';
import apiError, { expiredSession } from '../errors';
const { JWT_SECRET } = process.env;

const decodeToken = ({ token, genNewToken }) => {
  try {
    return verify(token, JWT_SECRET);
  } catch (error) {
    if (!genNewToken) apiError(expiredSession);
    if (genNewToken) return { expired: true };
  }
};

export default decodeToken;
