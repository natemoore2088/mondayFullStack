import express from 'express';
import { getAllFragrances, createNewFragrance, getFragranceById, updateFragrance, deleteFragrance } from '../controllers/fragranceController';

const router = express.Router();

router.route('/')
    .get(getAllFragrances)
    .post(createNewFragrance);

router.route('/:id')
    .get(getFragranceById)
    .patch(updateFragrance)
    .delete(deleteFragrance);

export default router;