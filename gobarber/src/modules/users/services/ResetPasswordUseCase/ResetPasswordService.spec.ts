import { AppError } from "../../../../shared/errors/AppError";
import { HashProviderInMemory } from "../../providers/HashProvider/in-memory/HashProviderInMemory";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import { CreateUserService } from "../CreateUsersUseCase/CreateUserService";
import { ResetPasswordService } from "./ResetPasswordService";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let resetPassword: ResetPasswordService;
let hashProviderInMemory: HashProviderInMemory;

describe('ResetPassword', () => {
    beforeEach(async() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
        hashProviderInMemory = new HashProviderInMemory();
        resetPassword = new ResetPasswordService(            
            userTokensRepositoryInMemory,
            usersRepositoryInMemory,
            hashProviderInMemory
        );
    })

    it('should be able to reset the password', async () => {

        const createUserService = new CreateUserService(usersRepositoryInMemory, hashProviderInMemory)

        const user = await createUserService.execute({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const {token} = await userTokensRepositoryInMemory.generate(user.id);

        console.log(user);
        console.log(token);

        const generateHash = jest.spyOn(hashProviderInMemory, 'generateHash');

        await resetPassword.execute({
            password: '123123',
            token,
        })        

        const updateUser = await usersRepositoryInMemory.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updateUser?.password).toBe('123123');

    })

    it('should not be able to reset the password with non-existing token', async() => {
        await expect(
            resetPassword.execute({
                token: 'non-existing-token',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to reset the password with non-existing user', async()=>{
        const {token} = await userTokensRepositoryInMemory.generate('non-existing-user');

        await expect(
            resetPassword.execute({
                token,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to reset password if passed more than 2 hours', async() => {
        const user = await usersRepositoryInMemory.create({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        const {token} = await userTokensRepositoryInMemory.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 5);
        });

        await expect(
            resetPassword.execute({
                password: '123456',
                token
            })
        ).rejects;
    })
})