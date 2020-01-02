import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RateController from './app/controllers/RateController';
import TransparencyController from './app/controllers/TransparencyController';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

// Users
routes.post('/users', UserController.store);
// Sessions
routes.post('/sessions', SessionController.store);
// Middlewares
routes.use(authMiddlewares);
// Users
routes.put('/users', UserController.update);
// Plans
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
// Rates
routes.get('/rates', RateController.index);
routes.get('/rates/:id', RateController.show);
routes.post('/rates', RateController.store);
routes.put('/rates/:id', RateController.update);
routes.delete('/rates/:id', RateController.delete);
// Transparencies
routes.post('/transparencies', TransparencyController.store);

export default routes;
