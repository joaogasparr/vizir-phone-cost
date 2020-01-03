import State from '../models/State';

class StateController {
  async index(req, res) {
    const states = await State.findAll({
      attributes: ['id', 'ddd', 'title'],
      order: ['id'],
    });

    return res.json(states);
  }
}

export default new StateController();
