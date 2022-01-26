import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity("appointments")
class Appointment{
    @PrimaryColumn()
    id: string;
    @Column()
    provider:string;
    @Column('timestamp with time zone')
    date:Date;

    constructor(){
        if(!this.id){
            this.id = v4();
        }
    }
}

export { Appointment }