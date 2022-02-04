import { AppError } from "../../../../shared/errors/AppError";
import { HashProviderInMemory } from "../../providers/HashProvider/in-memory/HashProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserService } from "./CreateUserService";

describe('CreateUser', () => {
    it('should be able to create a new user', async() => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const hashProviderInMemory = new HashProviderInMemory();
        const createUserService = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory);

        const user = await createUserService.execute({
            name: "John Doe",
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id');
    })

    it('should not be able to create a new user with email existing', async () => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const hashProviderInMemory = new HashProviderInMemory();
        const createUserService = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory);

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(
            createUserService.execute({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })
})