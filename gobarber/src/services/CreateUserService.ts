import { hash } from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../models/User";

interface Request{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{

    public async execute({name, email, password}:Request):Promise<User>{
        const usersRepository = getRepository(User)
        const userExists = await usersRepository.findOne({email});

        if(userExists){
            throw new Error('This email already exists');
        }

        const passwordHash = await hash(password, 8);        

        const user = usersRepository.create({
            name, email, password: passwordHash
        });

        await usersRepository.save(user);

        return user;
    }
}

export {CreateUserService}