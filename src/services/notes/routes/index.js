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
import authenticateToken from '../../../middlewares/auth.js';

const routes = express.Router();

routes.post('/notes', authenticateToken, validate(notePayloadSchema), createNote);
routes.get('/notes', authenticateToken, validateQuery(noteQuerySchema), getNotes);
routes.get('/notes/:id', authenticateToken, getNoteById);
routes.put('/notes/:id', authenticateToken, validate(notePayloadSchema), editNoteById);
routes.delete('/notes/:id', authenticateToken, deleteNoteById);

export default routes;