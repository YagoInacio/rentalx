import { getRepository, Repository } from 'typeorm';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create(carId: string, imageName: string): Promise<CarImage> {
    const carImage = this.repository.create({ carId, imageName });

    return this.repository.save(carImage);
  }
}

export { CarsImagesRepository };
