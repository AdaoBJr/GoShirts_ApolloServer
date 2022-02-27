import Customer from '../../repositories/mongodb/models/customer';
import { v4 as uuidv4 } from 'uuid';

const useCustomer = () => {
  const customerList = async () => await Customer.find();

  const CreateCustomer = async ({ data }) => {
    const id = uuidv4();
    const customerData = { id, ...data };
    const customer = await Customer.create(customerData);
    return { customer };
  };
  return { CreateCustomer, customerList };
};

export { useCustomer };
