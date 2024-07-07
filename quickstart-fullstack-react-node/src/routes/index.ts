import express from 'express';
import fragranceRoutes from './fragranceRoutes';
import healthRoutes from './healthRoutes';
import { verifyApiKey } from '../middleware/apiKeyAuth';
import { apiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

router.use(verifyApiKey); // Apply to all routes
router.use(apiLimiter);

router.use('/fragrances', fragranceRoutes);
router.use('/health', healthRoutes);

export default router;