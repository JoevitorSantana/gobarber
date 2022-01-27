import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import authConfig from '../config/auth'
import auth from "../config/auth";

interface IRequest{
    email: string;
    password: string;
}

interface Response{
    user: User;
    token: string;
}


class AuthenticationService{
    public async execute({email, password}:IRequest):Promise<Response>{
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({where: {email}});

        if(!user){
            throw new Error('Email or password incorrect!');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('Email or password incorrect!');
        }

        const token = sign({}, auth.jwt.secret, {
            subject: user.id,
            expiresIn: auth.jwt.expiresIn
        })

        return {user, token};
    }
}

export {AuthenticationService}