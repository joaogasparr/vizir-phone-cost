import Plan from '../models/Plan';
import Rate from '../models/Rate';

class TransparencyController {
  async store(req, res) {
    const { origin, destiny, duration, plan } = req.body;

    const rates = await Rate.findOne({
      where: { origin, destiny },
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
      origin,
      destiny,
      duration,
      plan: plans.title,
      priceWithFaleMais,
      priceWithOutFaleMais,
    });
  }
}

export default new TransparencyController();
