import * as Yup from 'yup';

const schema = Yup.object().shape({
  origin_id: Yup.number('Origin must be a number')
    .integer('Origin must be a integer')
    .positive('Origin must be a positive number')
    .required('Origin is required'),
  destiny_id: Yup.number('Destiny must be a number')
    .integer('Destiny must be a integer')
    .positive('Destiny must be a positive number')
    .required('Destiny is required'),
  price: Yup.string('Price must be string').required('Price is required'),
});

export default schema;
