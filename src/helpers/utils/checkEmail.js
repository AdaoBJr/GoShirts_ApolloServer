import Customer from '../../repositories/mongodb/models/customer';

const checkEmail = async ({ email }) => await Customer.findOne({ email }).exec();

export default checkEmail;
