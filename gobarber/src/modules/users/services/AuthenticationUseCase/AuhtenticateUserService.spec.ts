import { RedisCacheProvider } from "../../../../shared/container/providers/CacheProvider/implementations/RedisCaheProvider";
import { CacheProviderInMemory } from "../../../../shared/container/providers/CacheProvider/in-memory/CacheProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { HashProviderInMemory } from "../../providers/HashProvider/in-memory/HashProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserService } from "../CreateUsersUseCase/CreateUserService";
import { AuthenticationService } from "./AuthenticationService";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticationService;
let cacheProvider: CacheProviderInMemory;

describe('AuthenticateUser', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        hashProviderInMemory = new HashProviderInMemory();
        cacheProvider = new CacheProviderInMemory();
        createUserService = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory, cacheProvider);
        authenticateUserService = new AuthenticationService(usersRepositoryInMemory, hashProviderInMemory);
    })

    it('should be able to create a authenticatio', async () => {        

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

        expect(
            authenticateUserService.execute({
            email: 'johndoe@gmail.com',
            password: '123456'
        })
        ).rejects.toBeInstanceOf(AppError); 
    });

    it('should not be able to authenticate with wrong password', async () => {

        await createUserService.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        });

        expect(
            authenticateUserService.execute({
            email: 'johndoe@gmail.com',
            password: 'wrong-password'
        })
        ).rejects.toBeInstanceOf(AppError) 
    });  
})