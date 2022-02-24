import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface Request{
    user_id: string;
}

@injectable()
class ListProviderService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({user_id}:Request):Promise<User[]>{
        const users = this.usersRepository.findAllProviders(user_id);

        return users;
    }
}

export {ListProviderService}