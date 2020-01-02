import Rate from '../models/Rate';

class RateController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: rates } = await Rate.findAndCountAll({
      order: ['origin', 'destiny'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json({ count: Math.ceil(count / 5), rates });
  }

  async show(req, res) {
    const rates = await Rate.findByPk(req.params.id, {
      attributes: ['id', 'origin', 'destiny', 'price'],
    });

    return res.json(rates);
  }

  async store(req, res) {
    const { origin, destiny } = req.body;

    const rateExists = await Rate.findOne({ where: { origin, destiny } });

    if (rateExists) {
      return res.status(400).json({ error: 'Rate already exists.' });
    }

    const { id, price } = await Rate.create(req.body);

    return res.json({ id, origin, destiny, price });
  }

  async update(req, res) {
    const { origin, destiny } = req.body;

    const rates = await Rate.findByPk(req.params.id);

    if (rates.origin !== origin || rates.destiny !== destiny) {
      const rateExists = await Rate.findOne({ where: { origin, destiny } });

      if (rateExists) {
        return res.status(400).json({ error: 'Rate already exists.' });
      }
    }

    const { id, price } = await rates.update(req.body);

    return res.json({
      id,
      origin,
      destiny,
      price,
    });
  }

  async delete(req, res) {
    const rates = await Rate.findByPk(req.params.id);

    await rates.destroy();

    return res.json();
  }
}

export default new RateController();
