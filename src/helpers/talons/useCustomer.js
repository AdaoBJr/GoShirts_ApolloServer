import { hash, compare } from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import CustomerRepository from '../../repositories/mongodb/models/customer';
import { generateToken, checkEmail } from '../utils';
import apiError from '../errors';
import { userDoesNotExist, emailExists, emailOrPwdIncorrect } from '../errors';

const useCustomer = () => {
  const CustomerList = async () => await CustomerRepository.find();

  const CustomerInfo = async ({ id }) => ({
    customer: await CustomerRepository.findOne({ id }).exec(),
  });

  const UpdateCustomer = async ({ id, data }) => {
    const user = await CustomerRepository.findOne({ email: data.email }).exec();
    if (!user) apiError(userDoesNotExist);
    if (user) apiError(emailExists);

    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;

    return {
      customer: await CustomerRepository.findOneAndUpdate({ id }, data, { new: true }),
    };
  };

  const DeleteCustomer = async ({ email }) => ({
    delete: !!(await CustomerRepository.findOneAndDelete({ email })),
  });

  const SignInCustomer = async ({ data }) => {
    const { email, password } = data;
    const user = await CustomerRepository.findOne({ email }).exec();
    if (!user) apiError(emailOrPwdIncorrect);

    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) apiError(emailOrPwdIncorrect);
    return { token: generateToken({ userId: user.id }) };
  };

  const CreateCustomer = async ({ data }) => {
    const user = await checkEmail({ email: data.email });
    if (user) apiError(emailExists);

    const id = uuidV4();
    const passwordHash = await hash(data.password, 8);
    data.password = passwordHash;

    const customerData = { id, ...data };
    const customer = await CustomerRepository.create(customerData);
    return { customer };
  };

  return {
    CustomerList,
    CustomerInfo,
    UpdateCustomer,
    DeleteCustomer,
    SignInCustomer,
    CreateCustomer,
  };
};

export { useCustomer };
