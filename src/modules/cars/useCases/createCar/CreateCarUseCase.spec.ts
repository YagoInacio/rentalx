import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'car name',
      description: 'car desc',
      dailyRate: 100,
      licensePlate: 'ABC-1234',
      fineAmount: 60,
      brand: 'brand',
      categoryId: 'category',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'car name',
        description: 'car desc',
        dailyRate: 100,
        licensePlate: 'ABC-1234',
        fineAmount: 60,
        brand: 'brand',
        categoryId: 'category',
      });

      await createCarUseCase.execute({
        name: 'car name 2',
        description: 'car desc 2',
        dailyRate: 102,
        licensePlate: 'ABC-1234',
        fineAmount: 62,
        brand: 'brand 2',
        categoryId: 'category 2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'car available',
      description: 'car desc',
      dailyRate: 100,
      licensePlate: 'DEF-1234',
      fineAmount: 60,
      brand: 'brand',
      categoryId: 'category',
    });

    expect(car.available).toBe(true);
  });
});
