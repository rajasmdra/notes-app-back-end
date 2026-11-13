/* eslint-disable linebreak-style */
/* eslint-disable indent */
import InvariantError from '../../../exceptions/invariant-error.js';
import NotFoundError from '../../../exceptions/not-found-error.js';
import response from '../../../utils/response.js';
import UserRepositories from '../repositories/user-repositories.js';

export const createUser = async (req, res, next) => {
    const { username, password, fullname } = req.validated;

    const isNewUsername = await UserRepositories.verifyNewUsername(username);
    if (!isNewUsername) {
        return next(new InvariantError('Gagal menambahkan user. Username sudah digunakan.'));
    }

    const userId = await UserRepositories.createUser({
        username,
        password,
        fullname,
    });

    if (!userId) {
        return next(new InvariantError('User gagal ditambahkan'));
    }

    return response(res, 201, 'User berhasil ditambahkan', { userId });
};

export const getUserById = async (req, res, next) => {
    const { id } = req.params;
    const user = await UserRepositories.getUserById(id);

    if (!user) {
        return next(new NotFoundError('User tidak ditemukan'));
    }

    return response(res, 200, 'User berhasil ditampilkan', { user });
};