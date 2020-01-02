import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      origin: Yup.number('Origin must be a number')
        .integer('Origin must be a integer')
        .positive('Origin must be a positive number')
        .required('Origin is required'),
      destiny: Yup.number('Destiny must be a number')
        .integer('Destiny must be a integer')
        .positive('Destiny must be a positive number')
        .required('Destiny is required'),
      duration: Yup.number('Duration must be a number')
        .positive('Duration must be a positive number')
        .required('Duration is required'),
      plan: Yup.number('Plan must be a number')
        .positive('Plan must be a positive number')
        .required('Plan is required'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
