import { getRepository, Repository } from "typeorm";
import { ICreateAppointmentDTO } from "../../../dtos/ICreateAppointmentDTO";
import { IAppointmentsRepository } from "../../../repositories/IAppointmentsRepository";
import { Appointment } from "../entities/Appointment";

class AppointmentsRepository implements IAppointmentsRepository{

    private repository: Repository<Appointment>;

    constructor(){
        this.repository = getRepository(Appointment);
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const user = await this.repository.findOne({date});        
        return user;
    }
    
    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.repository.create({provider_id, date});

        await this.repository.save(appointment);

        return appointment;
    }

}

export {AppointmentsRepository};