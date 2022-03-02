import { RedisCacheProvider } from "../../../../shared/container/providers/CacheProvider/implementations/RedisCaheProvider";
import { CacheProviderInMemory } from "../../../../shared/container/providers/CacheProvider/in-memory/CacheProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { HashProviderInMemory } from "../../providers/HashProvider/in-memory/HashProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory"
import { CreateUserService } from "./CreateUserService";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let hashProviderInMemory: HashProviderInMemory;
let createUserService: CreateUserService;
let cacheProvider: CacheProviderInMemory;

describe('CreateUser', () => {

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        hashProviderInMemory = new HashProviderInMemory();
        cacheProvider = new CacheProviderInMemory();
        createUserService = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory, cacheProvider);
    })

    it('should be able to create a new user', async() => {        

        const user = await createUserService.execute({
            name: "John Doe",
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user).toHaveProperty('id');
    })

    it('should not be able to create a new user with email existing', async () => {

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