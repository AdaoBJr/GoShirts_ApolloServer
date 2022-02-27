import { useCustomer } from '../../../middlewares/talons/useCustomer';
const { CreateCustomer, customerList } = useCustomer();

export default {
  Query: {
    customerList: async () => await customerList(),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
  },
};
