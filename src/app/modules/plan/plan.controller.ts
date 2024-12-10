import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { PlanService } from './plan.service';

const createPlan = catchAsync(async (req, res) => {
  const result = await PlanService.createPlan(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan created successfully',
    data: result,
  });
});

const getAllPlan = catchAsync(async (req, res) => {
  const result = await PlanService.getAllPlans();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan created successfully',
    data: result,
  });
});

const updatePlan = catchAsync(async (req, res) => {
  const result = await PlanService.updatePlan(req.params.planId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan updated successfully',
    data: result,
  });
});

const deletePlan = catchAsync(async (req, res) => {
  const result = await PlanService.deletePlan(req.params.planId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Plan deleted successfully',
    data: result,
  });
});

export const PlanController = {
  createPlan,
  getAllPlan,
  updatePlan,
  deletePlan,
};
