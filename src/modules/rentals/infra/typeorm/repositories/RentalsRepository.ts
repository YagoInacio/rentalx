import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.repository.findOne({ carId });
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.repository.findOne({ userId });
  }

  async create({
    carId,
    userId,
    expectedReturnDate,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      carId,
      userId,
      expectedReturnDate,
    });

    return this.repository.save(rental);
  }
}

export { RentalsRepository };
