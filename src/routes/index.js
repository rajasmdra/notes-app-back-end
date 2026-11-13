/* eslint-disable linebreak-style */
import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/users/routes/index.js';
import authentications from '../services/authentications/routes/index.js';

const routes = Router();

routes.use('/', users);
routes.use('/', authentications);
routes.use('/', notes);

export default routes;