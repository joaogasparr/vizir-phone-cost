import { Router } from 'express';

// Controller's
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PlanController from './app/controllers/PlanController';
import RateController from './app/controllers/RateController';
import TransparencyController from './app/controllers/TransparencyController';
import StateController from './app/controllers/StateController';

// Middlewares
import validateUserStore from './app/validators/User/Store';
import validateUserUpdate from './app/validators/User/Update';
import validateSessionStore from './app/validators/Session/Store';
import validatePlanStore from './app/validators/Plan/Store';
import validatePlanUpdate from './app/validators/Plan/Update';
import validateRateStore from './app/validators/Rate/Store';
import validateRateUpdate from './app/validators/Rate/Update';
import validateTransparencyStore from './app/validators/Transparency/Store';
import authMiddlewares from './app/middlewares/auth';

const routes = new Router();

// Users
routes.post('/users', validateUserStore, UserController.store);
// Sessions
routes.post('/sessions', validateSessionStore, SessionController.store);
// Middlewares
routes.use(authMiddlewares);
// Users
routes.put('/users', validateUserUpdate, UserController.update);
// Plans
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', validatePlanStore, PlanController.store);
routes.put('/plans/:id', validatePlanUpdate, PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
// Rates
routes.get('/rates', RateController.index);
routes.get('/rates/:id', RateController.show);
routes.post('/rates', validateRateStore, RateController.store);
routes.put('/rates/:id', validateRateUpdate, RateController.update);
routes.delete('/rates/:id', RateController.delete);
// Transparencies
routes.post(
  '/transparencies',
  validateTransparencyStore,
  TransparencyController.store
);
// States
routes.get('/states', StateController.index);

export default routes;
