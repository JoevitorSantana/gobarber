
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "../../repositories/in-memory/UserTokensRepositoryInMemory";
import { SendForgotPasswordEmailService } from "./SendForgotPasswordEmailService";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;

describe('SendForgotPasswordEmail', () => {

    beforeEach(async() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        mailProviderInMemory = new MailProviderInMemory();
        userTokensRepositoryInMemory  = new UserTokensRepositoryInMemory();
        sendForgotPasswordEmail = new SendForgotPasswordEmailService(usersRepositoryInMemory, mailProviderInMemory, userTokensRepositoryInMemory);
    })

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(mailProviderInMemory, 'sendMail');

        await usersRepositoryInMemory.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })

        await sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com'
        })

        expect(sendMail).toHaveBeenCalled();
    })

    it('should not be able to send a email for a non-existing user', async () => {
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            usersRepositoryInMemory,
            mailProviderInMemory,
            userTokensRepositoryInMemory
        );

        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@gmail.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    })

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(userTokensRepositoryInMemory, 'generate');
    
        const user = await usersRepositoryInMemory.create({
            name: 'John doe',
            email: 'johndoe@gmail.com',
            password: '123456',
        })
    
        await sendForgotPasswordEmail.execute({
            email: 'johndoe@gmail.com',
        })
    
        expect(generateToken).toHaveBeenCalledWith(user.id);
    })
})