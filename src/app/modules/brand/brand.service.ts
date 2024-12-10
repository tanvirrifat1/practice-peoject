import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';

const updateBrand = async (id: string, data: Partial<IBrand>) => {
  const result = await Brand.findByIdAndUpdate(id, data, { new: true });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return result;
};

export const BrandService = {
  updateBrand,
};
