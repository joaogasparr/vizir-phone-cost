import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      origin_id: Yup.number('Origin must be a number')
        .integer('Origin must be a integer')
        .positive('Origin must be a positive number'),
      destiny_id: Yup.number('Destiny must be a number')
        .integer('Destiny must be a integer')
        .positive('Destiny must be a positive number'),
      price: Yup.number('Price must be a number').positive(
        'Price must be a positive number'
      ),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(401).json({ error: err.errors, details: err.inner });
  }
};
