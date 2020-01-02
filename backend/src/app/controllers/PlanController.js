import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { count, rows: plans } = await Plan.findAndCountAll({
      attributes: ['id', 'title', 'duration'],
      order: ['duration'],
      limit: 5,
      offset: (page - 1) * 5,
    });

    return res.json({ count: Math.ceil(count / 5), plans });
  }

  async show(req, res) {
    const plans = await Plan.findByPk(req.params.id, {
      attributes: ['id', 'title', 'duration'],
    });

    return res.json(plans);
  }

  async store(req, res) {
    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planExists) {
      return res.status(400).json({ error: 'Plan already exists.' });
    }

    const { id, title, duration } = await Plan.create(req.body);

    return res.json({ id, title, duration });
  }

  async update(req, res) {
    const { title } = req.body;

    const plans = await Plan.findByPk(req.params.id);

    if (plans.title !== title) {
      const planExists = await Plan.findOne({ where: { title } });

      if (planExists) {
        return res.status(400).json({ error: 'Plan already exists.' });
      }
    }

    const { id, duration } = await plans.update(req.body);

    return res.json({
      id,
      title,
      duration,
    });
  }

  async delete(req, res) {
    const plans = await Plan.findByPk(req.params.id);

    await plans.destroy();

    return res.json();
  }
}

export default new PlanController();
