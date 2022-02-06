import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { IUserTokensRepository } from "../IUserTokensRepository";

class UserTokensRepositoryInMemory implements IUserTokensRepository{    

    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id
        })

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const user = this.userTokens.find((findToken) => findToken.token === token);

        return user;
    }

}

export {UserTokensRepositoryInMemory}