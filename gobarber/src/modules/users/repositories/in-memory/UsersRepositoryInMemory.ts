import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{

    private usersRepository: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const user = this.usersRepository.find(user => user.id === id);

        return user;
    }
    
    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.usersRepository.find(user => user.email === email);

        return user;
    }

    public async create({name, email, password}: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, {
            name, email, password
        })

        this.usersRepository.push(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.usersRepository.findIndex(findUser => findUser.id === user.id);

        this.usersRepository[findIndex] = user;

        return user;
    }

    public async findAllProviders(except_user_id?: string):Promise<User[]>{
        let {usersRepository} = this;
    
        if(except_user_id){
            usersRepository = this.usersRepository.filter(user => user.id !== except_user_id);
        }
    
        return usersRepository;
    }

}

export {UsersRepositoryInMemory}