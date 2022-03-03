import { hash, compare } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import Customer from '../../repositories/mongodb/models/customer';
import { generateToken, checkEmail } from '../utils';

const useCustomer = () => {
  const CustomerList = async () => await Customer.find();

  const CustomerById = async ({ id }) => ({
    customer: await Customer.findOne({ id }).exec(),
  });

  const UpdateCustomerById = async ({ id, data }) => ({
    customer: await Customer.findOneAndUpdate(id, data, { new: true }),
  });

  const DeleteCustomerById = async ({ id }) => ({
    delete: !!(await Customer.findOneAndDelete(id)),
  });

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await Customer.findOne({ email }).exec();
    if (!user) throw new Error('E-mail or Password incorrect');

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error('E-mail or Password incorrect');
    return { token: generateToken({ id: user.id }) };
  };

  const CreateCustomer = async ({ data }) => {
    const user = await checkEmail({ email: data.email });
    if (user) throw new Error('Email already registered');

    const id = uuidV4();
    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;

    const customerData = { id, ...data };
    const customer = await Customer.create(customerData);
    return { customer };
  };

  return {
    CustomerList,
    CustomerById,
    UpdateCustomerById,
    DeleteCustomerById,
    SignInCustomer,
    CreateCustomer,
  };
};

export { useCustomer };
