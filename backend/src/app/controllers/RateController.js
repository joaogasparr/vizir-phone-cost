import Rate from '../models/Rate';
import State from '../models/State';

class RateController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: rates } = await Rate.findAndCountAll({
      attributes: ['id', 'price'],
      order: ['origin_id', 'destiny_id'],
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: State,
          as: 'origin',
          attributes: ['id', 'ddd', 'title'],
        },
        {
          model: State,
          as: 'destiny',
          attributes: ['id', 'ddd', 'title'],
        },
      ],
    });

    return res.json({ count: Math.ceil(count / 5), rates });
  }

  async show(req, res) {
    const rates = await Rate.findByPk(req.params.id, {
      attributes: ['id', 'price'],
      include: [
        {
          model: State,
          as: 'origin',
          attributes: ['id', 'ddd', 'title'],
        },
        {
          model: State,
          as: 'destiny',
          attributes: ['id', 'ddd', 'title'],
        },
      ],
    });

    return res.json(rates);
  }

  async store(req, res) {
    const { origin_id, destiny_id } = req.body;

    const rateExists = await Rate.findOne({ where: { origin_id, destiny_id } });

    if (rateExists) {
      return res.status(400).json({ error: 'Rate already exists.' });
    }

    const { id, price } = await Rate.create(req.body);

    return res.json({ id, origin_id, destiny_id, price });
  }

  async update(req, res) {
    const { origin_id, destiny_id } = req.body;

    const rates = await Rate.findByPk(req.params.id);

    if (rates.origin !== origin_id || rates.destiny !== destiny_id) {
      const rateExists = await Rate.findOne({
        where: { origin_id, destiny_id },
      });

      if (rateExists) {
        return res.status(400).json({ error: 'Rate already exists.' });
      }
    }

    const { id, price } = await rates.update(req.body);

    return res.json({
      id,
      origin_id,
      destiny_id,
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
