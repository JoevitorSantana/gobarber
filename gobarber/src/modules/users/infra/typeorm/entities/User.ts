import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";

@Entity('users')
class User{
    @PrimaryColumn()
    id: string;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    @Exclude()
    password:string;

    @Column()
    avatar:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'avatar_url'})
    getAvatarUrl(): string | null {
        return this.avatar ? `${process.env.APP_API_URL}/files/uploads/${this.avatar}`
        : null;
    }

    constructor(){
        if(!this.id){
            this.id = v4();
        }
    }
}

export {User}