import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const uploadCategories = multer(uploadConfig.upload('./tmp'));

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  uploadCategories.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
