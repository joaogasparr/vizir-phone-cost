import * as Yup from 'yup';

const schema = Yup.object().shape({
  name: Yup.string('Name must be string'),
  email: Yup.string('Email must be string').email('Invalid email format'),
  oldPassword: Yup.string('Old password must be string'),
  password: Yup.string('Password must be string').when(
    'oldPassword',
    (oldPassword, field) =>
      oldPassword ? field.required('Password is required') : field
  ),
  confirmPassword: Yup.string(
    'Confirm password must be string'
  ).when('password', (password, field) =>
    password
      ? field
          .required('Confirm password is required')
          .oneOf([Yup.ref('password')])
      : field
  ),
});

export default schema;
