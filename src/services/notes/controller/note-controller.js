/* eslint-disable linebreak-style */
/* eslint-disable indent */

import response from '../../../utils/response.js';
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import NotesRepositories from '../repositories/note-repositories.js';
import AuthorizationError from '../../../exceptions/authorization-error.js';

export const createNote = async (req, res, next) => {
    const { title, tags, body } = req.validated;
    const { id: owner } = req.user;

    const note = await NotesRepositories.createNote({
        title,
        body,
        tags,
        owner
    });

    if (!note) {
        return next(new InvariantError('Catatan gagal ditambahkan'));
    }

    const id = typeof note === 'string' ? note : note.id;
    return response(res, 201, 'Catatan berhasil ditambahkan', { noteId: id });
};

export const getNotes = async (req, res) => {
    const { id: owner } = req.user;
    const notes = await NotesRepositories.getNotes(owner);
    return response(res, 200, 'Catatan sukses ditampilkan', { notes });
};

export const getNoteById = async (req, res, next) => {
    const { id } = req.params;
    const { id: owner } = req.user;

    const note = await NotesRepositories.getNoteById(id);
    if (!note) {
        return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    const isOwner = await NotesRepositories.verifyNoteOwner(id, owner);
    if (!isOwner) {
        return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
    }

    return response(res, 200, 'Catatan sukses ditampilkan', { note });
};

export const editNoteById = async (req, res, next) => {
    const { id } = req.params;
    const { id: owner } = req.user;
    const { title, tags, body } = req.validated;

    const isOwner = await NotesRepositories.verifyNoteOwner(id, owner);
    if (!isOwner) {
        return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
    }

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
    const { id: owner } = req.user;

    const isOwner = await NotesRepositories.verifyNoteOwner(id, owner);
    if (!isOwner) {
        return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
    }

    const deletedNote = await NotesRepositories.deleteNoteById(id);
    if (!deletedNote) {
        return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
};