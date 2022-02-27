const customerdb = [];

export default {
  Query: {
    customerList: async () => customerdb,
  },
  Mutation: {
    createCustomer: async (_parent, args, _context, _info) => {
      const { data } = args;
      customerdb.push(data);
      return { customer: data };
    },
  },
};
