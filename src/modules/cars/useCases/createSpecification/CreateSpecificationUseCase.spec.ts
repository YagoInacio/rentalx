import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Specification', () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
  });

  it('should be able to create a specification', async () => {
    const specification = {
      name: 'Specification Test',
      description: 'Specification Test Description',
    };

    await createSpecificationUseCase.execute(specification);

    const createdSpecification =
      await specificationsRepositoryInMemory.findByName(specification.name);

    expect(createdSpecification).toHaveProperty('id');
  });

  it('should not be able to create a specification with same name', async () => {
    expect(async () => {
      const specification = {
        name: 'Specification Test',
        description: 'Specification Test Description',
      };

      await createSpecificationUseCase.execute(specification);

      await createSpecificationUseCase.execute(specification);
    }).rejects.toBeInstanceOf(AppError);
  });
});
