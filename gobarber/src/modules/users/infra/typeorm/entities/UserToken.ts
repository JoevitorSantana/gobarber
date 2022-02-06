import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity('user_tokens')
class UserToken{
    @PrimaryColumn()
    id: string;

    @Column()    
    token: string;

    @Column()
    user_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = v4();            
        }

        if(!this.token){
            this.token = v4();
        }
    }
}

export {UserToken}