/* eslint-disable linebreak-style */
/* eslint-disable indent */
import Joi from 'joi';

export const notePayloadSchema = Joi.object({
    title: Joi.string().required().max(50),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
});

export const noteQuerySchema = Joi.object({
    title: Joi.string().empty(),
});