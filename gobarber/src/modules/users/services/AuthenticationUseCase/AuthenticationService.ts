import 'reflect-metadata'
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../../infra/typeorm/entities/User";
import authConfig from '../../../../config/auth'
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';

interface IRequest{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}

@injectable()
class AuthenticationService{

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ){};

    public async execute({email, password}:IRequest):Promise<Response>{

        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError('Email or password incorrect!');
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if(!passwordMatched){
            throw new AppError('Email or password incorrect!');
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn
        })

        return {user, token};
    }
}

export {AuthenticationService}