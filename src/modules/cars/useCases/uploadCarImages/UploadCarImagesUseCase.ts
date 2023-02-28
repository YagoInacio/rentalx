import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

interface IRequest {
  carId: string;
  imagesNames: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ carId, imagesNames }: IRequest): Promise<void> {
    imagesNames.map(async (image) => {
      await this.carsImagesRepository.create(carId, image);
    });
  }
}

export { UploadCarImagesUseCase };
