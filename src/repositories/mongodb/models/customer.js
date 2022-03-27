import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  cpf: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: String,
    required: true,
  },
  gender: {
    type: Number,
    required: true,
  },
});

const CustomerRepository = mongoose.model('customer', Schema, 'customers');
export default CustomerRepository;
