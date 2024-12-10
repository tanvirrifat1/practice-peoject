import httpStatus from 'http-status';
import AppError from '../../../utils/AppError';
import { IBrand } from './brand.interface';
import { Brand } from './brand.model';
import unlinkFile from '../../../shared/unlinkFile';

const updateBrand = async (id: string, data: Partial<IBrand>) => {
  const isExistBrand = await Brand.findById(id);
  if (!isExistBrand) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  if (data.image && isExistBrand.image) {
    // Unlink the previous image if a new image is provided
    unlinkFile(isExistBrand.image);
  }

  const result: any = await Brand.findByIdAndUpdate(id, data, { new: true });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Brand not found');
  }

  return result;
};

export const BrandService = {
  updateBrand,
};
