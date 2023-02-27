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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    let index;
    if (id) {
      index = this.cars.findIndex((car) => car.id === id);
    }
    const car = id ? this.cars[index] : new Car();

    Object.assign(car, {
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
      specifications,
    });

    if (id) {
      this.cars[index] = car;
    } else {
      this.cars.push(car);
    }

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

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
