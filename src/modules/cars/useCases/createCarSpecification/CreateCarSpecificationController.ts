import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: carId } = request.params;
    const { specificationIds } = request.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );

    const car = await createCarSpecificationUseCase.execute({
      carId,
      specificationIds,
    });

    return response.status(200).json(car);
  }
}

export { CreateCarSpecificationController };
