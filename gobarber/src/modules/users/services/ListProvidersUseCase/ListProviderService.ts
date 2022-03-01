import { inject, injectable } from "tsyringe";
import { ICacheProvider } from "../../../../shared/container/providers/CacheProvider/models/ICacheProvider";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface Request{
    user_id: string;
}


@injectable()
class ListProviderService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ){}

    public async execute({user_id}:Request):Promise<User[]>{
        let users = await this.cacheProvider.recover<User[]>(`providers_list:${user_id}`);

        if(!users){
            users = await this.usersRepository.findAllProviders({except_user_id: user_id});

            await this.cacheProvider.save(`providers-list:${user_id}`, users)
        }

        return users;
    }
}

export {ListProviderService}