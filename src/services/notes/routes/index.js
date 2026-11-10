/* eslint-disable linebreak-style */
/* eslint-disable indent */
import express from 'express';
import {
    createNote,
    deleteNoteById,
    editNoteById,
    getNotes,
    getNoteById
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import validateQuery from '../../../middlewares/validateQuery.js';
import { notePayloadSchema, noteQuerySchema } from '../validator/schema.js';

const routes = express.Router();

routes.post('/notes', validate(notePayloadSchema), createNote);
routes.get('/notes', validateQuery(noteQuerySchema), getNotes);
routes.get('/notes/:id', getNoteById);
routes.put('/notes/:id', validate(notePayloadSchema), editNoteById);
routes.delete('/notes/:id', deleteNoteById);

export default routes;