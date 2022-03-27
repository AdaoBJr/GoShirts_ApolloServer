import { sign } from 'jsonwebtoken';
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10m',
};

const generateToken = async ({ id }) => {
  const token = sign({ id }, JWT_SECRET, jwtConfig);
  const items = [token];
  const customerToken = { userId: id, items, count: items.length };
  await CustomerTokensRepository.create(customerToken);
  return token;
};

export default generateToken;
