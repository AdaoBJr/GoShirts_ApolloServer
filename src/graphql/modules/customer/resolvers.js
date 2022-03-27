import { useCustomer } from '../../../helpers/talons/useCustomer';
const {
  CustomerList,
  CustomerById,
  UpdateCustomerById,
  DeleteCustomer,
  SignInCustomer,
  CreateCustomer,
} = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
    customerById: async (_, { hash: id }) => await CustomerById({ id }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    updateCustomerById: async (_, { hash: id, data }) =>
      await UpdateCustomerById({ id, data }),
    deleteCustomer: async (_, { email }) => await DeleteCustomer({ email }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
  },
};
