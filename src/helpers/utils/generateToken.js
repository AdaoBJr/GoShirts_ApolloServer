import { sign } from 'jsonwebtoken';
import CustomerTokensRepository from '../../repositories/mongodb/models/customerTokens';
import decodeToken from './decodeToken';

const { JWT_SECRET } = process.env;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '10m',
};

// First option for generate token

// const generateToken = async ({ id }) => {
//   const token = sign({ id }, JWT_SECRET, jwtConfig);
//   const items = [token];
//   const customerToken = { userId: id, items, count: items.length };
//   await CustomerTokensRepository.create(customerToken);
//   return token;
// };

const generateToken = async ({ userId }) => {
  const CustomerToken = await CustomerTokensRepository.findOne({ userId }).exec();

  const checkTokens =
    CustomerToken &&
    CustomerToken.items
      .map((token) => {
        const decodedToken = decodeToken({ token, genNewToken: true });
        return decodedToken.expired ? false : token;
      })
      .filter((item) => item);

  const token = sign({ id: userId }, JWT_SECRET, jwtConfig);

  const items = [];
  if (!checkTokens) items.push(token);
  if (checkTokens) items = [...checkTokens, token];

  const customerToken = { userId, items, count: items.length };

  if (checkTokens) {
    await CustomerTokensRepository.findByIdAndUpdate({ userId }, customerToken, {
      new: true,
    });
  } else {
    await CustomerTokensRepository.create(customerToken);
  }

  return token;
};

export default generateToken;
