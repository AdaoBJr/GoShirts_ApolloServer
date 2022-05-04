import { useCustomer } from '../../../helpers/talons/useCustomer';
const {
  CustomerList,
  CustomerInfo,
  UpdateCustomer,
  DeleteCustomer,
  SignInCustomer,
  CreateCustomer,
} = useCustomer();

export default {
  Query: {
    customerList: async () => await CustomerList(),
    customerInfo: async (_, { hash: id }) => await CustomerInfo({ id }),
  },
  Mutation: {
    createCustomer: async (_, { data }) => await CreateCustomer({ data }),
    updateCustomer: async (_, { hash: id, data }) => await UpdateCustomer({ id, data }),
    deleteCustomer: async (_, { email }) => await DeleteCustomer({ email }),
    signInCustomer: async (_, { data }) => await SignInCustomer({ data }),
  },
};
