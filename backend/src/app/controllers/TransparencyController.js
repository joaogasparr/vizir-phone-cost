import Plan from '../models/Plan';
import Rate from '../models/Rate';
import State from '../models/State';

class TransparencyController {
  async store(req, res) {
    const { origin_id, destiny_id, duration, plan } = req.body;

    const rates = await Rate.findOne({
      where: { origin_id, destiny_id },
      attributes: ['id', 'price'],
      include: [
        {
          model: State,
          as: 'origin',
          attributes: ['id', 'ddd'],
        },
        {
          model: State,
          as: 'destiny',
          attributes: ['id', 'ddd'],
        },
      ],
    });

    if (!rates) {
      return res.status(400).json({
        error: 'No registered rates for informed origin and destination',
      });
    }

    const plans = await Plan.findByPk(plan);

    if (!plans) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    let priceWithFaleMais = 0;
    if (plans.duration < duration) {
      const time = duration - plans.duration;

      priceWithFaleMais = rates.price * time;
      priceWithFaleMais += priceWithFaleMais * 0.1;
    }

    const priceWithOutFaleMais = rates.price * duration;

    return res.json({
      origin: rates.origin.ddd,
      destiny: rates.destiny.ddd,
      duration,
      plan: plans.title,
      priceWithFaleMais,
      priceWithOutFaleMais,
    });
  }
}

export default new TransparencyController();
