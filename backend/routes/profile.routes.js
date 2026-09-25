import express from 'express';
import profileController from '../controller/profile.controller.js';

const router = express.Router();

router.post('/', profileController.CreateProfile);
router.get('/', profileController.GetAllProfiles);
router.get('/:id', profileController.GetProfile);
router.put('/:id', profileController.UpdateProfile);

export default router;