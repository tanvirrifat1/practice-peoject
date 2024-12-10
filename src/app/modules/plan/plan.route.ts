import express from 'express';
import { PlanController } from './plan.controller';

const router = express.Router();

router.post('/create-plan', PlanController.createPlan);
router.get('/get-plan', PlanController.getAllPlan);
router.put('/update-plan/:planId', PlanController.updatePlan);

router.delete('/delete-plan/:planId', PlanController.deletePlan);

export const PlanRoutes = router;
