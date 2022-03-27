import { ApolloError } from 'apollo-server';

const apiError = ({ msg, code }) => {
  throw new ApolloError(msg, code);
};

export default apiError;
