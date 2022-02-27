import Customer from '../../../repositories/mongodb/models/customer';
import { v4 as uuidv4 } from 'uuid';

export default {
  Query: {
    customerList: async () => await Customer.find(),
  },
  Mutation: {
    createCustomer: async (_, { data }) => {
      const id = uuidv4();
      const customerData = { id, ...data };
      const customer = await Customer.create(customerData);
      return { customer };
    },
  },
};
