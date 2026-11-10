/* eslint-disable linebreak-style */
/* eslint-disable indent */

import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import NotesRepositories from '../repositories/note-repositories.js';

export const createNote = async (req, res, next) => {
    const { title, tags, body } = req.validated;
    const note = await NotesRepositories.createNote({
        title,
        body,
        tags
    });

    if (!note) {
        return next(new InvariantError('Catatan gagal ditambahkan'));
    }

    const id = typeof note === 'string' ? note : note.id;
    return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: id });
};

export const getNotes = async (req, res) => {
    const notes = await NotesRepositories.getNotes();
    return response(res, 200, 'Catatan sukses ditampilkan', { notes });
};

export const getNoteById = async (req, res, next) => {
    const { id } = req.params;
    const note = await NotesRepositories.getNoteById(id);

    if (!note) {
        return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNoteById = async (req, res, next) => {
    const { id } = req.params;
    const { title, tags, body } = req.validated;
    const note = await NotesRepositories.editNoteById({
        id,
        title,
        body,
        tags
    });

    if (!note) {
        return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    return response(res, 200, 'Catatan berhasil diperbarui', note);
};

export const deleteNoteById = async (req, res, next) => {
    const { id } = req.params;
    const deletedNote = await NotesRepositories.deleteNoteById(id);

    if (!deletedNote) {
        return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
};