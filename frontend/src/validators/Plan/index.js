import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string('Title must be string').required('Title is required'),
  duration: Yup.number('Duration must be a number')
    .integer('Duration must be a integer')
    .positive('Duration must be a positive number')
    .required('Duration is required'),
});

export default schema;
