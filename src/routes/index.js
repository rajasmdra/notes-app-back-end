/* eslint-disable linebreak-style */
import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
import users from '../services/users/routes/index.js';

const routes = Router();

routes.use('/', notes);
routes.use('/', users);

export default routes;