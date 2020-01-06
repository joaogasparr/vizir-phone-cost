import faker from 'faker';
import { factory } from 'factory-girl';

import User from '../src/app/models/User';
import Plan from '../src/app/models/Plan';
import Rate from '../src/app/models/Rate';
import State from '../src/app/models/State';

factory.define('User', User, {
  id: faker.random.number(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('State', State, {
  ddd: faker.random.number(),
  title: faker.name.title(),
});

factory.define('Plan', Plan, {
  title: faker.name.title(),
  duration: faker.random.number(),
});

factory.define('Rate', Rate, {
  origin_id: faker.random.number(),
  destiny_id: faker.random.number(),
  price: faker.random.number(),
});

export default factory;
