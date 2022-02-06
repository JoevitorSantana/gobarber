import { getRepository, Repository } from "typeorm";
import { IUserTokensRepository } from "../../../repositories/IUserTokensRepository";
import { UserToken } from "../entities/UserToken";

class UserTokensRepository implements IUserTokensRepository{

    private repository: Repository<UserToken>;

    constructor(){
        this.repository = getRepository(UserToken);
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id
        })

        await this.repository.save(userToken);

        return userToken;
    }
    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.repository.findOne({token});

        return userToken;
    }

}

export {UserTokensRepository}