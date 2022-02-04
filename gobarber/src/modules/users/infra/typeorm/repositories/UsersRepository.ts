import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {

    private repository: Repository<User>;

    constructor(){
        this.repository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOne({id});

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({email});
        return user;
    }    

    public async create({name, email, password}: ICreateUserDTO): Promise<User> {
        const user = this.repository.create({name, email, password});

        await this.repository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return this.repository.save(user);
    }

}

export {UsersRepository}