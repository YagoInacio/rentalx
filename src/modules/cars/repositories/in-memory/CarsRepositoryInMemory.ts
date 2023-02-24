import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = this.cars.filter((car) => car.available);

    if (brand || categoryId || name) {
      return cars.filter(
        (car) =>
          (brand && car.brand === brand) ||
          (categoryId && car.categoryId === categoryId) ||
          (name && car.name === name)
      );
    }

    return cars;
  }
}

export { CarsRepositoryInMemory };
