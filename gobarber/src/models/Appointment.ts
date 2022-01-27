import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";
import { User } from "./User";

@Entity("appointments")
class Appointment{
    @PrimaryColumn()
    id: string;
    @Column()
    provider_id:string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date:Date;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;

    constructor(){
        if(!this.id){
            this.id = v4();
        }
    }
}

export { Appointment }