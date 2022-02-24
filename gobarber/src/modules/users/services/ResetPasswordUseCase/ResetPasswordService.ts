import { addHours, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface Request{
    password: string;
    token: string;
}
@injectable()
class ResetPasswordService{

    constructor(
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProviders: IHashProvider,
    ){}

    public async execute({password, token}:Request):Promise<void>{
        const userToken = await this.userTokensRepository.findByToken(token);

        if(!userToken){
            throw new AppError('User token does not exist');
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        if(!user){
            throw new AppError('User does not exist');
        }

        const tokenCreatedAt = userToken.created_at;

        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(new Date(Date.now()), compareDate)){
            throw new AppError('Token expired');
        }

        user.password = await this.hashProviders.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export {ResetPasswordService}