import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

let updateUserAvatarUseCase: UpdateUserAvatarUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Update Avatar', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    updateUserAvatarUseCase = new UpdateUserAvatarUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to update user avatar', async () => {
    const user: ICreateUserDTO = {
      driver_license: '00123',
      email: 'user@test.com',
      password: '1234',
      name: 'User Avatar Test',
    };

    await createUserUseCase.execute(user);

    const createdUser = await usersRepositoryInMemory.findByEmail(user.email);

    await updateUserAvatarUseCase.execute({
      user_id: createdUser.id,
      avatar_file: 'test.jpg',
    });

    const result = await usersRepositoryInMemory.findByEmail(user.email);

    expect(result).toHaveProperty('avatar');
  });
});
