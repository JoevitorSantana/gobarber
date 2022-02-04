import { AppError } from "../../../../shared/errors/AppError";
import { HashProviderInMemory } from "../../providers/HashProvider/in-memory/HashProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserService } from "../CreateUsersUseCase/CreateUserService";
import { AuthenticationService } from "./AuthenticationService";

describe('AuthenticateUser', () => {
    it('should be able to create a authenticatio', async () => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const hashProviderInMemory = new HashProviderInMemory();
        const createUserService = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory);
        const authenticateUserService = new AuthenticationService(usersRepositoryInMemory, hashProviderInMemory);

        const user = await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const response = await authenticateUserService.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(response).toHaveProperty('token'),
        expect(response.user).toEqual(user)
    });

    it('should be able to authenticate with a non-existing user', async () => { 
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const hashProviderInMemory = new HashProviderInMemory();
        const autenticateUser = new AuthenticationService(usersRepositoryInMemory, hashProviderInMemory);            

        expect(
            autenticateUser.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(AppError); 
    });

    it('should not be able to authenticate with wrong password', async () => {
        const usersRepositoryInMemory = new UsersRepositoryInMemory();
        const hashProviderInMemory = new HashProviderInMemory();
        const autenticateUser = new AuthenticationService(usersRepositoryInMemory, hashProviderInMemory);
        const createUser = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory);

        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        expect(
            autenticateUser.execute({
            email: 'johndoe@gmail.com',
            password: 'wrong-password'
        })
        ).rejects.toBeInstanceOf(AppError) 
    });  
})