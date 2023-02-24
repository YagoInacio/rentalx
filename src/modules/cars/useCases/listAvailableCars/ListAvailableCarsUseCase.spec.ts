import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      dailyRate: 110,
      licensePlate: 'XXX1Y23',
      fineAmount: 40,
      brand: 'Car brand',
      categoryId: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      dailyRate: 110,
      licensePlate: 'XXX1Y23',
      fineAmount: 40,
      brand: 'Car brand test',
      categoryId: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car brand test',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Car description',
      dailyRate: 110,
      licensePlate: 'XXX1Y23',
      fineAmount: 40,
      brand: 'Car brand test',
      categoryId: 'category_id',
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car3',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car2',
      description: 'Car description',
      dailyRate: 110,
      licensePlate: 'XXX1Y23',
      fineAmount: 40,
      brand: 'Car brand test',
      categoryId: '1243',
    });

    const cars = await listAvailableCarsUseCase.execute({
      categoryId: '1243',
    });

    expect(cars).toEqual([car]);
  });
});
