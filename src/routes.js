/* eslint-disable linebreak-style */
/* eslint-disable indent */
import express from 'express';
import {
    createNote,
    deleteNoteById,
    editNoteById,
    getNotes,
    getNoteById
} from './controller.js';

const routes = express.Router();
routes.post('/notes', createNote);
routes.get('/notes', getNotes);
routes.get('/notes/:id', getNoteById);
routes.put('/notes/:id', editNoteById);
routes.delete('/notes/:id', deleteNoteById);

export default routes;