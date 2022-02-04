import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { User } from "../../infra/typeorm/entities/User";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface Request{
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){}

    public async execute({name, email, password}:Request):Promise<User>{        
        const userExists = await this.usersRepository.findByEmail(email);

        if(userExists){
            throw new AppError('This email already exists');
        }

        const passwordHash = await this.hashProvider.generateHash(password);        

        const user = await this.usersRepository.create({
            name, email, password: passwordHash
        });        

        return user;
    }
}

export {CreateUserService}